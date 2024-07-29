let myMap;
let lyrOSM;
let mrkCurrentLocation;//localizacion actual
let popZocalo;
//let ctlZoom;
let ctlAttribute;
let ctlScale;
let ctlPan;
let ctlZoomSlider;
let ctlMousePosition;
let ctlMeasure;
//let popExample;

$(document).ready(function(){
    myMap = L.map('mapdiv', {//creamos el mapa con el id
                            center: [-34.9, -58.3], //centra en mapa un una latitud y longitud 
                            zoom: 13, //zoom de 13
                            zoomControl: false, //control del zoom sin visualizar
                            attributionControl:false
                            /*
                            dragging: false,//funcion de arrastrar falso
                            minZoom: 10,//minimo del zoom
                            maxZoom: 14//maximo del zoom
                            */
                    });

    lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');//creamos la caja de mosaicos de la calle

    myMap.addLayer(lyrOSM);//al mapa le agregamos el mosaico de calles
/*
    myMap.on('click', function(e){//cuando se haga un click se realiza la funcion del evento
        if(e.originalEvent.shiftkey){//si al hacer click y estoy precionando la tecla shift
            alert(myMap.getZoom());//muestra el nivel del zoom y obtiene el nivel maximo usado
        } else{
            alert(e.latlng.toString());
        }
    });
/*
    setInterval(function(){
        myMap.locate();
    }, 5000);//permite actualizar tu ubicacion cada 5 segundos, se usa mas que nada en dispositivos moviles
*/
    
    ctlPan = L.control.pan().addTo(myMap);//plugins de las flecahas para moverse
    ctlZoomSlider = L.control.zoomslider({position:'topright'}).addTo(myMap);//plugins del slider del zoom
    ctlMousePosition = L.control.mousePosition().addTo(myMap);//plugins que marca la position del mouse
    ctlMeasure = L.control.polylineMeasure().addTo(myMap);

    //ctlZoom = L.control.zoom({zoomInText:'+', zoomOutText:'-', position:'bottomright'});//herramientas de zoom y posicion de donde va a estar colocado
    //ctlZoom.addTo(myMap);//se agrega al mapa

    ctlAttribute = L.control.attribution({position: 'bottomleft'}).addTo(myMap);//control de atributo
    ctlAttribute.addAttribution('OSM');//se agrega
    ctlAttribute.addAttribution('&copy;<a href="http://google.com">Google</a>');//se agrega enlase

    ctlScale = L.control.scale({position:'bottomleft', metric: false, maxWidth: 200}).addTo(myMap);
    
    popZocalo = L.popup({maxWidth:200, keepInview:true});//ventana emergente, con sus parametros
    popZocalo.setLatLng([-34.92386, -58.38516]);//donde aparecera
    popZocalo.setContent("<h2>Alquiler</h2><h4>Ecuador 636</h4>");//contenido, se puede ingresar img tambien
/*
    popExample = L.popup();
    popExample.setLatLng([-34.92386, -58.40516]);
    popExample.setContent($("#side-bar")[0]);
    popExample.openOn(myMap);
*/ //creamos una ventana emergente con los datos que habia en la barra laterarl y los botones
    
    myMap.on('contextmenu', function(e){//cuando hago click derecho
        let dtCurrent = new Date();//muestra la fecha actual
        L.marker(e.latlng).addTo(myMap).bindPopup(e.latlng.toString()+"<br>"+dtCurrent);//se genera un marcador donde se hizo click 
    });//bindPopup: ventana emergente

    myMap.on('keypress', function(e){
        if(e.originalEvent.key == "l"){//si se preciono la tecla L
            myMap.locate();//localiza mi ubicacion
        }
    });
/*
    myMap.on('locationfound', function(e){//localizacion encontrada
        console.log(e);
        if(mrkCurrentLocation){//localizacion actual esta definida 
            mrkCurrentLocation.remove();//remover
        }//esto es para que no se sigan creando varios circulos
        mrkCurrentLocation = L.circleMarker(e.latlng).addTo(myMap);//creamos y agregamos un circulo marcador en la localizacion actual
        myMap.setView(e.latlng, 14);//se visualiza en la laty long con un tamaño14
    });*/

    myMap.on('locationfound', function(e){//localizacion encontrada
        //console.log(e);
        if(mrkCurrentLocation){//localizacion actual esta definida 
            mrkCurrentLocation.remove();//remover
        }//esto es para que no se sigan creando varios circulos
        mrkCurrentLocation = L.circle(e.latlng,{radius: e.accuracy/2}).addTo(myMap);//creamos y agregamos un circulo marcador en la localizacion actual
        myMap.setView(e.latlng, 14);//se visualiza en la laty long con un zoom14
    }); //la ubicacion se muestra con mayor rango, utiliza metros, no pixeles, no cambia el tamaño del circulo

    myMap.on('locationerror', function(e){
        //console.log(e);
        alert("Localizacion no encontrada");
    });

    myMap.on('zoomend', function(){//manejamos el zoom
        $("#zoom-level").html(myMap.getZoom());
    });

    myMap.on('moveend', function(){//muestra el centro del mapa que estamos viendo
        $("#map-center").html(LatLngToArrayString(myMap.getCenter()));
    });

    myMap.on('mousemove', function(e){//muestra la localizacion del cursor
        $("#mouse-location").html(LatLngToArrayString(e.latlng));
    });

    $("#btnLocate").click(function(){
        myMap.locate();
    });
    
    $("#btnZocalo").click(function(){
        myMap.setView([-34.92386, -58.38516],17);
        myMap.openPopup(popZocalo);
    });


});

function LatLngToArrayString(ll){//para tener una mejor vicion de la informacion
    //console.log(ll);
    return "["+ll.lat.toFixed(5)+", "+ll.lng.toFixed(5)+"]";
}


