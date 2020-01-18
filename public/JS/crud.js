var myMarker
var actualLatitude
var actualLongitude
var mymap
var markerIcon;
// Main function that creates the map and calls other functions
function main(){
    console.log("ENTRE");
    mymap = L.map('mapid').setView([9.948539942335483, -444.04008294120575], 15);
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
        
    markerIcon = L.icon({
        iconUrl: './RES/marker.png',
        iconSize:     [30, 30], 
        iconAnchor:   [15, 26], 
        popupAnchor:  [-3, -50] 
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
    if(name === ""){
        console.log("Campo Vacio");
        htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops!</strong>Ingrese el nombre del punto</div>');
        $('#pointmessages').html(htmlserror);
    }else{
        newpoint.push(latitude);
        newpoint.push(longitude);
        newpoint.push(lastIndex);
        points.push(newpoint);
        htmlspoints.push('<tr><td>'+name+'</td><th>'+latitude+'</th><th>'+longitude+'</th><td><button data-toggle="modal" data-target="#remove-modal" class="btn btn-danger removeData" data-id="' + lastIndex + '">Eliminar</button></td></tr>');
        $('#tbody').html(htmlspoints);
        lastIndex = lastIndex+1;
        L.marker([actualLatitude, actualLongitude],{icon:markerIcon}).addTo(mymap)
    }
});
$("body").on('click', '.removeData', function () {
    var id = $(this).attr('data-id');
    $('body').find('.users-remove-record-model').append('<input name="id" type="hidden" value="' + id + '">');
});

$('.deleteRecord').on('click', function () {
    var values = $(".users-remove-record-model").serializeArray();
    var id = values[0].value;

    var point = points[id];
    var name = point[0].value;
    var lat = point[1];
    var lng = point[2];
    var stringvalue = '<tr><td>'+name+'</td><th>'+lat+'</th><th>'+lng+'</th><td><button data-toggle="modal" data-target="#remove-modal" class="btn btn-danger removeData" data-id="' + id + '">Eliminar</button></td></tr>'

    for(var i = htmlspoints.length - 1; i >= 0; i--) {
        if(htmlspoints[i] === stringvalue) {
            htmlspoints.splice(i, 1);
        }
    }
    for(var i = points.length - 1; i >= 0; i--) {
        if(points[i][3] === id) {
            points.splice(id,1);
        }
    }
    $('#tbody').html(htmlspoints);
    $('body').find('.users-remove-record-model').find("input").remove();
    $("#remove-modal").modal('hide');
});
$('.remove-data-from-delete-form').click(function () {
    $('body').find('.users-remove-record-model').find("input").remove();
});