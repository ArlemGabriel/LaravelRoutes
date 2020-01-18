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
        <link href="CSS/styles.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Dosis:400,500,600,700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lobster&display=swap" rel="stylesheet"> 
    <title>Crear Ruta</title>

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
            <li class="nav-item active">
                <a class="nav-link" href="#">Crear Ruta</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="searchroutes">Buscar Rutas</a>
            </li>
            </ul>
        </div>
        </div>
    </nav> 

    <div class="container">
        <div class="row">
            <div class="col">
                <div class="container" style="margin-top: 50px;">

                    <h4 class="text-center">Agregar Nueva Ruta</h4><br>
                    
                    <h5>Ruta</h5>
                    <div class="card card-default">
                        <div class="card-body">
                            <form id="route" class="form-inline" method="POST" action="">
                                <div class="form-group mb-2 mb-3 ml-2">
                                    <label for="routeID" class="sr-only">ID</label>
                                    <input id="routeID" type="text" class="form-control" name="routeID" placeholder="Identificador"
                                        >
                                </div>
                                <div class="form-group mb-2  mb-3 ml-2">
                                    <label for="routeName" class="sr-only">Nombre de la Ruta</label>
                                    <input id="routeName" type="text" class="form-control" name="routeName" placeholder="Nombre de la Ruta"  >
                                </div>
                                <button id="submitRoute" type="button" class="btn btn-primary mb-2 mb-3 ml-2">Guardar Ruta</button>
                                <div id="routemessages">
                                </div>
                            </form>
                        </div>
                    </div>

                    <h5>Agregar Punto</h5>
                    <div class="card card-default">
                        <div class="card-body">
                            <form id="addPoint" class="form-inline" method="POST" action="">
                                <div class="form-group mb-2 mb-3 ml-2">
                                    <label for="pointDescription" class="sr-only">Descripción</label>
                                    <input id="pointDescription" type="text" class="form-control" name="pointDescription" placeholder="Descripción"
                                        >
                                </div>
                                <div class="form-group mb-2 mb-3 ml-2">
                                    <label for="pointLat" class="sr-only">Latitud</label>
                                    <input id="pointLat" type="text" class="form-control" name="pointLat" placeholder="Latitud"
                                         disabled>
                                </div>
                                <div class="form-group mb-2 mb-3 ml-2">
                                    <label for="pointLon" class="sr-only">Longitud</label>
                                    <input id="pointLon" type="text" class="form-control" name="pointLon" placeholder="Longitud"
                                         disabled>
                                </div>
                                <button id="submitPoint" type="button" class="btn btn-primary mb-2 mb-3 ml-2">Agregar Punto</button>
                                <div id="pointmessages">

                                </div>
                            </form>
                        </div>
                    </div>

                    <br>

                </div>

                <!-- Update Model -->
                <form action="" method="POST" class="users-update-record-model form-horizontal">
                    <div id="update-modal" data-backdrop="static" data-keyboard="false" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" style="width:55%;">
                            <div class="modal-content" style="overflow: hidden;">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="custom-width-modalLabel">Update</h4>
                                    <button type="button" class="close" data-dismiss="modal"
                                            aria-hidden="true">×
                                    </button>
                                </div>
                                <div class="modal-body" id="updateBody">

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light"
                                            data-dismiss="modal">Close
                                    </button>
                                    <button type="button" class="btn btn-success updateCustomer">Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Delete Model -->
                <form action="" method="POST" class="users-remove-record-model" >
                    <div id="remove-modal" data-backdrop="static" data-keyboard="false" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel"
                        aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered" style="width:55%;">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="custom-width-modalLabel">Delete</h4>
                                    <button type="button" class="close remove-data-from-delete-form" data-dismiss="modal"
                                            aria-hidden="true">×
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p>Do you want to delete this record?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default waves-effect remove-data-from-delete-form"
                                            data-dismiss="modal">Close
                                    </button>
                                        <button type="button" class="btn btn-danger waves-effect waves-light deleteRecord">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col">
                <div id="mapid"></div>
                            
            </div>
        </div>
    </div>
    <div class = "container">
        <h5>Puntos</h5>
            <table class="table table-responsive">
                <tr>
                    <th >Descripción</th>
                    <th >Latitud</th>
                    <th >Longitud</th>
                    <th width="180" class="text-center">Acción</th>
                </tr>
                <tbody id="tbody">

                </tbody>
            </table>
    </div>


{{--Firebase Tasks--}}
<script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase.js"></script>
<script src="/JS/createroute.js"></script>
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>

   

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

</body>
</html>