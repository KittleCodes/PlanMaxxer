from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
   return '''
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PlanMaxxer</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <nav class="navbar" style="background-color: #3bdddb;">
        <div class="container-fluid" >
            <span class="navbar-brand mb-0 h1">PlanMaxxer</span>
        </div>
    </nav>
    <main class="flex-shrink-0" style="padding: 2%;">
    <h1>Modules</h1>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
            <div class="card">
            <img src="/static/icons/weather.svg" class="card-img-top w-25" alt="...">
            <div class="card-body">
                <h5 class="card-title">Weather</h5>
                <p class="card-text">Check the weather for today, this week, next week, or last month.</p>
                <a href="#" class="btn btn-primary">View Weather</a>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
            <img src="/static/icons/calendar.svg" class="card-img-top w-25" alt="...">
            <div class="card-body">
                <h5 class="card-title">Calendar</h5>
                <p class="card-text">View your plans today, create plans, or count the days.</p>
                <a href="#" class="btn btn-primary">View Calendar</a>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
            <img src="/static/icons/wardrobe.svg" class="card-img-top w-25" alt="...">
            <div class="card-body">
                <h5 class="card-title">Wardrobe</h5>
                <p class="card-text">View all the clothes that you own, or add new ones.</p>
                <a href="#" class="btn btn-primary">View Wardrobe</a>
            </div>
            </div>
        </div>
    </div>
</div>
    </main>
    <footer class="fixed-bottom" style="background-color: #5fbbce; padding: 1%;">
        <div class="container">
            <span class="text-muted">weather by Rini Bahtiar from <a href="https://thenounproject.com/browse/icons/term/weather/" target="_blank" title="weather Icons">Noun Project</a> (CC BY 3.0)</span>
            <span class="text-muted">Calendar by Corner Pixel from <a href="https://thenounproject.com/browse/icons/term/calendar/" target="_blank" title="Calendar Icons">Noun Project</a> (CC BY 3.0)</span>
            <span class="text-muted">wardrobe by MihiMihi from <a href="https://thenounproject.com/browse/icons/term/wardrobe/" target="_blank" title="wardrobe Icons">Noun Project</a> (CC BY 3.0)</span>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  </body>
</html>
'''

if __name__ == '__main__':
   app.run(debug=True,host="127.0.0.1",port=7575)