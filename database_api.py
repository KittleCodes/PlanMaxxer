from __main__ import app
from flask import request
import sqlite3

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

@app.route('/db/calendar/add_event', methods=['POST'])
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