var retrievedpoints = [];
var retrievedname;
var flag;
var mymap;
var markers =[];
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
var markerIcon;
var markerStart;
var markerEnd;
var routingControl = null;

firebase.initializeApp(config);
// Function that creates the map and icons for markers
function main(){
    mymap = L.map('mapid2').setView([9.948539942335483, -444.04008294120575], 15);
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const maxzoom = 35;
    L.tileLayer(url,{attribution,maxzoom}).addTo(mymap);
    markerIcon = L.icon({
        iconUrl: './RES/marker.png',
        iconSize:     [30, 30], 
        iconAnchor:   [15, 26], 
        popupAnchor:  [-3, -50] 
    });
    markerStart = L.icon({
        iconUrl: './RES/start.png',
        iconSize:     [30, 30], 
        iconAnchor:   [15, 26], 
        popupAnchor:  [-3, -50] 
    });
    markerEnd = L.icon({
        iconUrl: './RES/finish.png',
        iconSize:     [30, 30], 
        iconAnchor:   [15, 26], 
        popupAnchor:  [-3, -50] 
    });
}
// submitSeearch onClick that sends a request to firebase and search the route
$('#submitSearch').on('click', function () {
    var newsearch = $("#searchRoute").serializeArray();
    var tempsearchid = newsearch[0].value;
    var searchid = tempsearchid.toUpperCase();
    var htmlserror = [];
    $('#routessearchmessages').html(htmlserror);
    if(validateEmptySearch(searchid)==true){
        htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops! </strong>Ingrese un identificador</div>');
        $('#routessearchmessages').html(htmlserror);
    }else{
        
        firebase.database().ref('routes/').child(searchid).once('value', function (snapshot){
            if(snapshot.exists()){
                var value = snapshot.val();
                retrievedname = value.name;
                retrievedpoints = value.points;
                flag = true;
            }else{
                flag = false;
            }
        }).then(function(){
            if(flag ==true){
                putDataOnHtml();
                drawRouteOnMap();
                createWayPoints();
            }else{
                htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops! </strong>No existe la ruta ingresada</div>');
                $('#routessearchmessages').html(htmlserror);
            }
        });
        

    }
});
// Function that validates the textfield of search is not empty
function validateEmptySearch(searchid){
    if(searchid==""){
        return true;
    }else{
        return false;
    }
}
// Function that puts htmls of retrieved data to display it
function putDataOnHtml(){
    var htmls = [];

    for(var i=0;i<=retrievedpoints.length-1;i++){
        htmls.push('<tr>\
                <td>' + retrievedname + '</td>\
                <td>' + retrievedpoints[i].description+ '</td>\
                <td>' + retrievedpoints[i].lat+ '</td>\
                <td>' + retrievedpoints[i].long+ '</td>\
            </tr>');
    }
    $('#tbody2').html(htmls);
        
}
// Function that draws the route on the map
function drawRouteOnMap(){
    if(markers.length == 0){
        addMarkers();
    }else{
        removeOldMarkers();
        addMarkers();
    }
}
// Function that draws the route
function createWayPoints(){
    if(routingControl==null){
        createRouting();
    }else{
        mymap.removeControl(routingControl);
        routingControl=null;
        createRouting();
    }
}
// Function that add the markers on the map
function addMarkers(){
    markers = [];
    for(var i=0;i<=retrievedpoints.length-1;i++){
        if(i!=0 && i!=retrievedpoints.length-1){
            var myMarker = L.marker([retrievedpoints[i].lat,retrievedpoints[i].long],{icon:markerIcon}).addTo(mymap)
            markers.push(myMarker);
        }else if(i==0){
            var myMarker = L.marker([retrievedpoints[i].lat,retrievedpoints[i].long],{icon:markerStart}).addTo(mymap)
            markers.push(myMarker);
        }else{
            var myMarker = L.marker([retrievedpoints[i].lat,retrievedpoints[i].long],{icon:markerEnd}).addTo(mymap)
            markers.push(myMarker);
        }
    }
}

function removeOldMarkers(){
    for(var i=0; i<=markers.length-1;i++){
        mymap.removeLayer(markers[i]);
    }
}
function createRouting(){
    let waypoints = [];
        for(var i=0;i<=retrievedpoints.length-1;i++){
            var wpnt = L.latLng(retrievedpoints[i].lat,retrievedpoints[i].long);
            waypoints.push(wpnt);
        }
        routingControl = L.Routing.control({createMarker: function() { return null; }, waypoints:waypoints}).addTo(mymap);
}