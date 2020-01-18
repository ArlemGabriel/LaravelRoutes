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
    <title>CRUD Rutas</title>

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
                <a class="nav-link" href="crudroutes">Crear Ruta</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Editar Ruta</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Buscar Rutas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Eliminar Rutas</a>
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
                                <div class="form-group mb-2">
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
                                    <label for="pointName" class="sr-only">Nombre</label>
                                    <input id="pointName" type="text" class="form-control" name="pointName" placeholder="Nombre"
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

                    <h5>Puntos</h5>
                    <table class="table table-bordered">
                        <tr>
                            <th>Nombre</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th width="180" class="text-center">Action</th>
                        </tr>
                        <tbody id="tbody">

                        </tbody>
                    </table>
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



{{--Firebase Tasks--}}
<script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase.js"></script>
<script src="/JS/crud.js"></script>
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
<script>
    /*firebase.initializeApp(initializeconfig());
    var database = firebase.database();
    var lastIndex = 0;

    
    // Get Data
    firebase.database().ref('customers/').on('value', function (snapshot) {
        var value = snapshot.val();
        var htmls = [];
        $.each(value, function (index, value) {
            if (value) {
                htmls.push('<tr>\
        		<td>' + value.name + '</td>\
        		<td>' + value.email + '</td>\
        		<td><button data-toggle="modal" data-target="#update-modal" class="btn btn-info updateData" data-id="' + index + '">Update</button>\
        		<button data-toggle="modal" data-target="#remove-modal" class="btn btn-danger removeData" data-id="' + index + '">Delete</button></td>\
        	</tr>');
            }
            lastIndex = index;
        });
        $('#tbody').html(htmls);
        $("#submitUser").removeClass('desabled');
    });

    // Add Data
    $('#submitCustomer').on('click', function () {
        var values = $("#addCustomer").serializeArray();
        var name = values[0].value;
        var email = values[1].value;
        var userID = lastIndex + 1;

        console.log(values);
        
        firebase.database().ref('customers/' + userID).set({
            name: name,
            email: email,
        });

        // Reassign lastID value
        lastIndex = userID;
        $("#addCustomer input").val("");
    });

    // Update Data
    var updateID = 0;
    $('body').on('click', '.updateData', function () {
        updateID = $(this).attr('data-id');
        firebase.database().ref('customers/' + updateID).on('value', function (snapshot) {
            var values = snapshot.val();
            var updateData = '<div class="form-group">\
		        <label for="first_name" class="col-md-12 col-form-label">Name</label>\
		        <div class="col-md-12">\
		            <input id="first_name" type="text" class="form-control" name="name" value="' + values.name + '" required autofocus>\
		        </div>\
		    </div>\
		    <div class="form-group">\
		        <label for="last_name" class="col-md-12 col-form-label">Email</label>\
		        <div class="col-md-12">\
		            <input id="last_name" type="text" class="form-control" name="email" value="' + values.email + '" required autofocus>\
		        </div>\
		    </div>';

            $('#updateBody').html(updateData);
        });
    });

    $('.updateCustomer').on('click', function () {
        var values = $(".users-update-record-model").serializeArray();
        var postData = {
            name: values[0].value,
            email: values[1].value,
        };

        var updates = {};
        updates['/customers/' + updateID] = postData;

        firebase.database().ref().update(updates);

        $("#update-modal").modal('hide');
    });
*/
    // Remove Data
    /*$("body").on('click', '.removeData', function () {
        var id = $(this).attr('data-id');
        console.log(id);
        $('body').find('.users-remove-record-model').append('<input name="id" type="hidden" value="' + id + '">');
    });

    $('.deleteRecord').on('click', function () {
        var values = $(".users-remove-record-model").serializeArray();
        var id = values[0].value;
        ///firebase.database().ref('customers/' + id).remove();
        $('body').find('.users-remove-record-model').find("input").remove();
        $("#remove-modal").modal('hide');
    });
    $('.remove-data-from-delete-form').click(function () {
        $('body').find('.users-remove-record-model').find("input").remove();
    });*/
</script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

</body>
</html>