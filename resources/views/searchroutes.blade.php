<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="CSS/mapstyle.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        
        <link href="https://fonts.googleapis.com/css?family=Dosis:400,500,600,700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lobster&display=swap" rel="stylesheet"> 
    <title>Buscar Ruta</title>

</head>
<body onload="main()">
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: rgb(129, 129, 129)">
        <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="/">Inicio
                <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="createroutes">Crear Ruta</a>
            </li>
            <li class="nav-item  active">
                <a class="nav-link" href="#">Buscar Rutas</a>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="text" placeholder="Ingrese el ID de la ruta ..." aria-label="Buscar" name="searchRoute" id="searchRoute">
                    <button id="submitSearch" class="btn btn-primary my-2 my-sm-0" type="button">Buscar</button>
                    <div id="routessearchmessages" class= "mt-2 ml-3">

                </div>
                </form>
                
            </div>
        </div>
        <div class= "row">
            <div class="col">
                <div id="mapid2">
                </div>
            </div>
        </div>
    </div>
    <div class = "container">
        <h5>Información de Ruta</h5>
            <table class="table table-responsive">
                <tr>
                    <th width="50%">Nombre de la Ruta</th>
                    <th width="50%" >Descripción</th>
                    <th >Latitud</th>
                    <th >Longitud</th>
                    <th class="text-center">Acción</th>
                </tr>
                <tbody id="tbody2">

                </tbody>
            </table>
    </div>

{{--Firebase Tasks--}}
<script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase.js"></script>
<script src="/JS/searchroute.js"></script>
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
<script src="https://use.fontawesome.com/300c00e36b.js"></script>

   

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

</body>
</html>