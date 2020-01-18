var myMarker
var actualLatitude
var actualLongitude
// Main function that creates the map and calls other functions
function main(){
    console.log("ENTRE");
    var mymap = L.map('mapid').setView([9.948539942335483, -444.04008294120575], 15);
    actualLatitude = 9.94607;
    actualLongitude = -444.0391;
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const maxzoom = 35;
    L.tileLayer(url,{attribution,maxzoom}).addTo(mymap);
    myMarker = L.marker([9.948539942335483, -444.04008294120575], {title: "MyPoint", alt: "The Big I", draggable: true})
		.addTo(mymap)
		.on('dragend', function() {
			var coord = String(myMarker.getLatLng()).split(',');
			console.log(coord);
			var lat = coord[0].split('(');
			console.log(lat);
			var lng = coord[1].split(')');
            console.log(lng);
            document.getElementById("pointLon").value = ""+lng[0]+""; 
            document.getElementById("pointLat").value = ""+lat[1]+"";
            actualLatitude = lat[1];
            actualLongitude = lng[0];
			myMarker.bindPopup("Posición Actual: " + lat[1] + ", " + lng[0] + ".");
		});
}

var config = {
    apiKey: "AIzaSyAgZD9elZclhel1u5wxdU-hd_oZIL4lmG0",
    authDomain: "laravelroutes.firebaseapp.com",
    databaseURL: "https://laravelroutes.firebaseio.com",
    projectId: "laravelroutes",
    storageBucket: "laravelroutes.appspot.com",
    messagingSenderId: "358324923799",
    appId: "1:358324923799:web:0facf4314d8bdc794c68d2",
    measurementId: "G-61TQH457C2"

};
firebase.initializeApp(config);
var database = firebase.database();
var lastIndex = 0;
var points = [];
var htmlspoints = []

$('#submitPoint').on('click', function () {
    var newpoint = $("#addPoint").serializeArray();
    var name = newpoint[0].value;
    var latitude = actualLatitude;//newpoint[1].value;
    var longitude = actualLongitude; //newpoint[2].value;
    var htmlserror = [];
    $('#pointmessages').html(htmlserror);
    if(name === "" || latitude ===""|| longitude === ""){
        console.log("Campo Vacio");
        htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops!</strong>Todos los campos del punto son obligatorios</div>');
        $('#pointmessages').html(htmlserror);
    }else{
        points.push(newpoint);
        htmlspoints.push('<tr>\
                            <td>'+name+'</td>\
                            <th>'+latitude+'</th>\
                            <th>'+longitude+'</th>\
                            <td><button data-toggle="modal" data-target="#remove-modal" class="btn btn-danger removeData" data-id="' + lastIndex + '">Delete</button></td>\
                            </tr>');
        $('#tbody').html(htmlspoints);
        lastIndex = lastIndex+1;
    }

    /*var values = $("#addCustomer").serializeArray();
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
    $("#addCustomer input").val("");*/
});
/*
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
});*/

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

// Remove Data
$("body").on('click', '.removeData', function () {
    var id = $(this).attr('data-id');
    $('body').find('.users-remove-record-model').append('<input name="id" type="hidden" value="' + id + '">');
});

$('.deleteRecord').on('click', function () {
    var values = $(".users-remove-record-model").serializeArray();
    var id = values[0].value;
    firebase.database().ref('customers/' + id).remove();
    $('body').find('.users-remove-record-model').find("input").remove();
    $("#remove-modal").modal('hide');
});
$('.remove-data-from-delete-form').click(function () {
    $('body').find('.users-remove-record-model').find("input").remove();
});