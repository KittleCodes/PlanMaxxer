from __main__ import app
import os
from flask import request, jsonify
import sqlite3

app.config['UPLOAD_FOLDER'] = 'static/clothing-images'

@app.route('/db')
def db():
    return 'ur here'

@app.route('/db/calendar/events')
def calendar_events():
    con = sqlite3.connect("calendar.db")
    cur = con.cursor()
    # cur.execute('''create table "events" (
  # "id" integer primary key autoincrement,
  # "name" TEXT not null,
  # "desc" TEXT not null,
  # "date" BIGINT not null,
  # "date2" BIGINT null,
  # "all_day" BOOLEAN not null,
  # "repeat_option" INT8 not null
# )''')
    cur.execute('SELECT * FROM events')
    rows = cur.fetchall()
    con.close()
    return rows

@app.route('/db/calendar/add-event', methods=['POST'])
def calendar_add_event():
    con = sqlite3.connect("calendar.db")
    cur = con.cursor()

    data = request.json

    name = data['name']
    desc = data['desc']
    date = data['date']
    date2 = data['date2']
    all_day = data['all_day']
    repeat_option = data['repeat_option']
    color = data['color']

    print(data)
    cur.execute(f'''INSERT INTO events (name, desc, date, date2, all_day, repeat_option, color) VALUES ("{name}", "{desc}", "{date}", "{date2}", "{all_day}", "{repeat_option}", "{color}")''')
    con.commit()
    con.close()

    return '{"code":"200"}'

@app.route('/db/wardrobe/items')
def wardrobe_items():
    con = sqlite3.connect("wardrobe.db")
    cur = con.cursor()
#   cur.execute('''CREATE TABLE Clothing (
#    id INTEGER PRIMARY KEY AUTOINCREMENT,
#    name TEXT NOT NULL,
#    clothing_type TEXT NOT NULL,
#    color TEXT,
#    size TEXT,
#    brand TEXT,
#    material TEXT,
#    purchase_date DATE,
#    price NUMERIC(10, 2),
#    notes TEXT,
#    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#);
#''')
    cur.execute('SELECT * FROM clothing')
    rows = cur.fetchall()
    con.close()
    return rows

@app.route('/db/wardrobe/add-item', methods=['POST'])
def wardrobe_add_item():
    con = sqlite3.connect("wardrobe.db")
    cur = con.cursor()

    name = request.form.get('name')
    item_type = request.form.get('type')
    color = request.form.get('color')
    size = request.form.get('size')
    brand = request.form.get('brand')
    material = request.form.get('material')
    notes = request.form.get('notes')
    date = request.form.get('date')
    price = request.form.get('price')

    cur.execute('''INSERT INTO clothing (name, clothing_type, color, size, brand, material, notes, purchase_date, price) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''', 
                (name, item_type, color, size, brand, material, notes, date, price))

    item_id = cur.lastrowid

    image = request.files['image']
    if image:
        image_filename = f'{item_id}.png'
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_filename)
        image.save(image_path)

    con.commit()
    con.close()
    
    return jsonify({"message": "Item added successfully"}), 200

@app.route('/db/wardrobe/search/<field>')
def search_color(field):
    con = sqlite3.connect("wardrobe.db")
    cur = con.cursor()

    cur.execute(f'SELECT DISTINCT {field} FROM clothing')
    rows = cur.fetchall()
    con.close()
    return rows

@app.route('/db/wardrobe/search', methods=['GET'])
def search():
    con = sqlite3.connect("wardrobe.db")
    cur = con.cursor()
    args = request.args

    base_query = "SELECT * FROM clothing WHERE 1=1"
    params = []

    if args.get('name'):
        base_query += " AND name LIKE ?"
        params.append(f'%{args["name"]}%')
    if args.get('color'):
        base_query += " AND color LIKE ?"
        params.append(f'%{args["color"]}%')
    if args.get('size'):
        base_query += " AND size LIKE ?"
        params.append(f'%{args["size"]}%')
    if args.get('brand'):
        base_query += " AND brand LIKE ?"
        params.append(f'%{args["brand"]}%')
    if args.get('type'):
        base_query += " AND clothing_type LIKE ?"
        params.append(f'%{args["type"]}%')
    if args.get('material'):
        base_query += " AND material LIKE ?"
        params.append(f'%{args["material"]}%')
    if args.get('notes'):
        base_query += " AND notes LIKE ?"
        params.append(f'%{args["notes"]}%')
    if args.get('date'):
        base_query += " AND purchase_date LIKE ?"
        params.append(f'%{args["date"]}%')
    if args.get('price'):
        base_query += " AND price LIKE ?"
        params.append(f'%{args["price"]}%')

    cur.execute(base_query, params)
    rows = cur.fetchall()

    con.close()
    return jsonify(rows)
