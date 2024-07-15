from __main__ import app

@app.route('/wardrobe')
def wardrobe():
    return '''
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PlanMaxxer - Weather</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
    .hour {
    	background-color: #8282ff;
        border-radius: 10px;
        box-shadow: 0px 0px 5px 1px #8282ff;
        color: white;
        text-align: center;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
        min-width: 100px;
    }
    .hour img {
    	width: 40%;
    }
    .remove-all-margin {
        margin:0 !important;
        padding:0 !important;
    }
    </style>
  </head>
  <body>
    <nav class="navbar" style="background-color: #3bdddb;">
        <div class="container-fluid" >
            <span class="navbar-brand mb-0 h1">PlanMaxxer - Wardrobe</span>
            <a class="nav-link" aria-current="page" href="/">Return Home</a>
        </div>
    </nav>
    <div id="loader" style="position: absolute;margin: auto;top: 0;right: 0;bottom: 0;left: 0;width: 100px;height: 100px;"><div class="spinner-grow" role="status"></div><div class="spinner-grow" role="status"></div><div class="spinner-grow" role="status"></div></div>
    <main id="main" class="flex-shrink-0" style="padding: 1%;display: none;">
    <div id="detailsModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header" style="background-color: #6464E5; color: white;">
                <h5 id="modal-date" class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="events-body" class="modal-body" style="background-color: #8282FF; color: white;">
                <div id="event-card" class="card hour" style="display: none;">
                    <div class="card-header">
                        <h3 id="event-title"></h3>
                    </div>
                    <div class="card-body">
                        <p id="event-description"></p>
                        <p id="event-time"></p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
        <div class="container">
            <div class="row row-cols-1 row-cols-md-3 g-4" id="wardrobe-items">
                <div class="col" id="clothing-item" style="display: none;">
                    <div class="card hour">
                        <div class="card-header">
                            <img data-bs-toggle="modal" data-bs-target="#detailsModal" id="expand" src="/static/icons/expand.svg" class="position-absolute" style="float: right; width: 7%; display: inline-block; right: 1%; top: 2%;">
                            <h5 id="item-name" class="card-title">Item Name</h5>
                        </div>
                        <div class="card-body position-relative" style="padding: 5px;">
                            <img onerror="this.onerror=null;this.src='/static/clothing-images/error.png';" id="item-image">
                            <p id="item-notes" class="card-text">Item Notes</p>
                            <p class="card-text"><small class="text-muted" id="item-details" style="color: #363636!important;">Bought on 7/15/2024 for $19.99</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="/static/js/wardrobe.js"></script>
  </body>
</html>
'''