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
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const maxzoom = 35;
    L.tileLayer(url,{attribution,maxzoom}).addTo(mymap);
}

$('#submitSearch').on('click', function () {
    console.log("BUSCAR");
    var newsearch = $("#searchRoute").serializeArray();
    var searchid = newsearch[0].value;
    var htmlserror = [];
    $('#routessearchmessages').html(htmlserror);
    if(validateEmptySearch(searchid)==true){
        htmlserror.push('<div class="alert alert-danger fade show" role="alert" id="authalert"><strong>Ooops! </strong>Ingrese un identificador</div>');
        $('#routessearchmessages').html(htmlserror);
    }else{
        firebase.database().ref('routes/').child(searchid).on('value', function (snapshot){
            if(snapshot.exists()){
                console.log("EXISTE"+snapshot.val());
                var htmls = [];
                var value = snapshot.val();
                console.log(value.name)
            }else{
                console.log("NO EXISTE")
            }
        });
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
function validateEmptySearch(searchid){
    if(searchid==""){
        return true;
    }else{
        return false;
    }
}