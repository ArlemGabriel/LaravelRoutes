var myMarker
var actualLatitude
var actualLongitude
var mymap
var markerIcon;
var markers = [];
var indexroute =0;
// Main function that creates the map and calls other functions
function main(){
    mymap = L.map('mapid').setView([9.948539942335483, -444.04008294120575], 15);
    actualLatitude = 9.94607;
    actualLongitude = -444.0391;
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const maxzoom = 35;
    L.tileLayer(url,{attribution,maxzoom}).addTo(mymap);
    myMarker = L.marker([9.94607, -444.0391], {title: "MyPoint", alt: "The Big I", draggable: true})
		.addTo(mymap)
		.on('dragend', function() {
            var coord = String(myMarker.getLatLng()).split(',');
            var lat = coord[0].split('(');
            var lng = coord[1].split(')');
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
    var ref = firebase.database().ref("routes");
        ref.on("value",function(snapshot) {
            //console.log("CHILDRENSCOUNT"+snapshot.numChildren());
            indexroute = snapshot.numChildren();
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

// Agregar puntos
$('#submitPoint').on('click', function () {
    var newpoint = $("#addPoint").serializeArray();
    var name = newpoint[0].value;
    var htmlserror = [];
    $('#pointmessages').html(htmlserror);
    if(name === ""){
        htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops!</strong>Ingrese el nombre del punto</div>');
        $('#pointmessages').html(htmlserror);
    }else{
        var marker = []
        newpoint.push(actualLatitude);
        newpoint.push(actualLongitude);
        newpoint.push(lastIndex);
        points.push(newpoint);
        htmlspoints.push('<tr><td>'+name+'</td><th>'+actualLatitude+'</th><th>'+actualLongitude+'</th><td><button data-toggle="modal" data-target="#remove-modal" class="btn btn-danger removeData" data-id="' + lastIndex + '">Eliminar</button></td></tr>');
        $('#tbody').html(htmlspoints);
        lastIndex = lastIndex+1;
        var myMarker = L.marker([actualLatitude,actualLongitude],{icon:markerIcon}).addTo(mymap)
        marker.push(myMarker);
        marker.push(actualLatitude);
        marker.push(actualLongitude);
        markers.push(marker);
    }
});
$('#submitRoute').on('click', function () {
    var newroute = $("#route").serializeArray();
    var name = newroute[0].value;
    var htmlserror = [];
    $('#routemessages').html(htmlserror);
    if(name === ""){
        htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops! </strong>Ingrese el nombre de la ruta</div>');
        $('#routemessages').html(htmlserror);
    }else if(points.length==0 || points.length==1){
        htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops! </strong>Ingrese al menos dos puntos </div>');
        $('#routemessages').html(htmlserror);
    }else{
        indexroute = indexroute+1;
        var JSONobjects = [];
        var preparingJSON;
        for(var i = 0; i <= points.length -1; i++){
            preparingJSON = '{"nombre" : "'+points[i][0].value+'" ,"lat" :'+points[i][1]+',"long" : '+points[i][2]+'}';
            JSONobject =JSON.parse(preparingJSON);
            JSONobjects.push(JSONobject);
        }
        firebase.database().ref('routes/' + indexroute).set({
            name: name,
            points: JSONobjects,
        });
        
        points = [];
        htmlspoints = [];
        for(var i=0; i<=markers.length-1;i++){
            mymap.removeLayer(markers[i][0]);
        }
        markers = [];
        document.getElementById("routeName").value = "";
        document.getElementById("pointName").value = "";
        $('#tbody').html(htmlspoints);
        
    }
});
$("body").on('click', '.removeData', function () {
    var id = $(this).attr('data-id');
    $('body').find('.users-remove-record-model').append('<input name="id" type="hidden" value="' + id + '">');
});

// Borrar puntos
$('.deleteRecord').on('click', function () {
    var values = $(".users-remove-record-model").serializeArray();
    var id = values[0].value;
    var name;
    var lat;
    var lng;
    // Borra los puntos
    for(var i = points.length - 1; i >= 0; i--) {
        if(points[i][3] == id) {
            name = points[i][0].value;
            lat = points[i][1];
            lng = points[i][2];
            points.splice(i,1);
            break;
        }
    }

    var stringvalue = '<tr><td>'+name+'</td><th>'+lat+'</th><th>'+lng+'</th><td><button data-toggle="modal" data-target="#remove-modal" class="btn btn-danger removeData" data-id="' + id + '">Eliminar</button></td></tr>'
    
    // Borra los elementos del html que muestran los puntos
    for(var i = htmlspoints.length - 1; i >= 0; i--) {
        if(htmlspoints[i] === stringvalue) {
            htmlspoints.splice(i, 1);
        }
    }
    for(var i = markers.length - 1; i >= 0; i--) {
        if(markers[i][1] ==lat && markers[i][2] == lng) {
            mymap.removeLayer(markers[i][0]);
        }
    }
    $('#tbody').html(htmlspoints);
    $('body').find('.users-remove-record-model').find("input").remove();
    $("#remove-modal").modal('hide');
});
$('.remove-data-from-delete-form').click(function () {
    $('body').find('.users-remove-record-model').find("input").remove();
});