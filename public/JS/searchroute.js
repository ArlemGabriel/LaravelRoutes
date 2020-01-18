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
function main(){
    mymap = L.map('mapid2').setView([9.948539942335483, -444.04008294120575], 15);
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
}