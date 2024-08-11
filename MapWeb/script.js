let myMap;
let lyrOSM;
let lyrWatercolor;
let lyrTopo;
let lyrImagery;
let lyrOutdoors;

let lyrNidoAguila;
let lyrNidoRapaz;
let lyrMarkerCluster;
let lyrClientLines;
let lyrClientBUOWL;
let lyrGBH;

//let lyrImagenPlaza;
let mrkCurrentLocation;//localizacion actual
let mrkYPF;
let plnBikeRoute;
let plyParks;
let fgpZona;
let popZocalo;
//let ctlZoom;
let ctlAttribute;
let ctlScale;
let ctlPan;
let ctlZoomSlider;
let ctlMousePosition;
let ctlMeasure;
let ctlEasyButton;
let ctlSidebar;
let ctlLayers;
let objBasemaps;
let objOverlays;
//let popExample;
/*
let icnRedSprite;
let icnVioletSprite;
let icnLAMtree;
let icnLAMbird;
let icnMKtree;
let icnMKbird;
*/
$(document).ready(function(){
    /*
    icnRedSprite = L.spriteIcon('red');
    icnVioletSprite = L.spriteIcon('violet');
    
    icnLAMtree = L.AwesomeMarkers.icon({icon: 'tree-conifer', markerColor: 'green'});
    icnLAMbird = L.AwesomeMarkers.icon({icon: 'twitter', markerColor: 'green', iconColor: '#FF0000', prefix: 'fa', spin: true});
    
    icnMKbird = L.icon.mapkey({icon: 'school', color: "#880000", backgroundColor: 'green'});
    icnMKtree = L.icon.mapkey({icon: 'tree_cinofer', color: "#880000", backgroundColor: '#00FF00', size: 50, borderRadius: 5});
*/

//******************** Inicializacion del Mapa*************** */

/*
    myMap = L.map('mapdiv', {//creamos el mapa con el id
                            center: [-34.9, -58.3], //centra en mapa un una latitud y longitud 
                            zoom: 13, //zoom de 13
                            zoomControl: false, //control del zoom sin visualizar
                            attributionControl:false
                            /*
                            dragging: false,//funcion de arrastrar falso
                            minZoom: 10,//minimo del zoom
                            maxZoom: 14//maximo del zoom
                            
                    });
*/

    myMap = L.map('mapdiv', {
        center: [40.18, -104.83], 
        zoom: 11,
        attributionControl:false

    });
     
    ctlPan = L.control.pan().addTo(myMap);//plugins de las flecahas para moverse
    ctlZoomSlider = L.control.zoomslider({position:'topright'}).addTo(myMap);//plugins del slider del zoom
    ctlMousePosition = L.control.mousePosition().addTo(myMap);//plugins que marca la position del mouse
    ctlMeasure = L.control.polylineMeasure().addTo(myMap);//plugins que crea in marca y mide distancias entre las marcas
    ctlEasyButton = L.easyButton('glyphicon glyphicon-log-in', 
                                function(){
                                    //myMap.locate();//marca la ubicacion actual
                                    ctlSidebar.toggle();//abre y cierra barra lateral
                                }).addTo(myMap);//plugins que crea un boton
    ctlSidebar = L.control.sidebar('side-bar').addTo(myMap);//plugins para crear barra lateral

    //ctlZoom = L.control.zoom({zoomInText:'+', zoomOutText:'-', position:'bottomright'});//herramientas de zoom y posicion de donde va a estar colocado
    //ctlZoom.addTo(myMap);//se agrega al mapa

    ctlAttribute = L.control.attribution({position: 'bottomleft'}).addTo(myMap);//control de atributo
    ctlAttribute.addAttribution('OSM');//se agrega
    ctlAttribute.addAttribution('&copy;<a href="http://google.com">Google</a>');//se agrega enlase

    ctlScale = L.control.scale({position:'bottomleft', metric: false, maxWidth: 200}).addTo(myMap);
     
//******************** Inicializacion de la capa *************** */

    //lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');//creamos la caja de mosaicos de la calle
    lyrOSM = L.tileLayer.provider('OpenStreetMap.Mapnik');//diferentes tipos de mapas
    lyrTopo = L.tileLayer.provider('OpenTopoMap');//diferentes tipos de mapas
    lyrImagery = L.tileLayer.provider('Esri.WorldImagery');//diferentes tipos de mapas
    //lyrOutdoors = L.tileLayer.provider('OThunderforest.Outdoors');//diferentes tipos de mapas
    lyrWatercolor = L.tileLayer.provider('Stadia.StamenWatercolor');//diferentes tipos de mapas

    myMap.addLayer(lyrOSM);//al mapa le agregamos el mosaico de calles

    //lyrImagenPlaza = L.imageOverlay('img/ImagenPlaza.png',[[19.42993,-99.20843],[19.40621,-9917453]],{opacity:0.5}).addTo(myMap);//esto es una imagen que va sobre una capa en el mapa, primero se carga la imagen, luego las coordenadas de donde se va a ubicar y despues las opciones de la imagen
        
    mrkYPF = L.marker([-34.922526, -58.381251],{draggable:true})//.addTo(myMap);
    mrkYPF.bindTooltip("AutoServicio YPF");

   
    plyParks = L.polygon([[[[-34.921728, -58.387761],[-34.926797, -58.386409],[-34.92384, -58.380506],[-34.921428, -58.381815]],[[-34.922889, -58.384069],[-34.924034, -58.383661],[-34.922731, -58.383296]]],
        [[-34.919809, -58.389156],[-34.920707, -58.388662],[-34.920178, -58.387933]]],{color:'red', fillColor:'yellow', fillOpacity:0.8})//.addTo(myMap);//creamos un poligono en el mapa con sus propiedades

    plnBikeRoute = L.polyline([[[-34.92384, -58.38524],[-34.923442, -58.384253],[-34.924313, -58.383909],[-34.923811, -58.382503],[-34.923037, -58.382815],
        [-34.922817, -58.381935],[-34.922262, -58.381859],[-34.922526, -58.381251]], 
        [[-34.92384, -58.38524],[-34.923442, -58.384253],[-34.922587, -58.384544],[-34.922341, -58.383053],
        [-34.923037, -58.382815],[-34.922817, -58.381935],[-34.922262, -58.381859]]],{color:'purple'})//.addTo(myMap);//tenemos creado dos lineas color rojo
 
    fgpZona = L.featureGroup([plnBikeRoute, plyParks]).addTo(myMap);//creamos un grupo de capas

    lyrNidoAguila = L.geoJSON.ajax('data/wildlife_eagle.geojson', 
    {pointToLayer: returnAguilaMarker}).addTo(myMap);
    /*
    lyrNidoAguila.on('data:loaded', function(){
        myMap.fitBounds(lyrNidoAguila.getBounds());
    });
/*
    lyrNidoRapaz = L.geoJSON.ajax('data/wildlife_raptor.geojson', 
    {pointToLayer: returnRapazMarker}).addTo(myMap);
    lyrNidoRapaz.on('data:loaded', function(){
    });
    */
    lyrMarkerCluster = L.markerClusterGroup();
    
    lyrNidoRapaz = L.geoJSON.ajax('data/wildlife_raptor.geojson',
    {poinToLayer:returnRapazMarker});
    lyrNidoRapaz.on('data:loaded', function(){
        lyrMarkerCluster.addLayer(lyrNidoRapaz);
        lyrMarkerCluster.addTo(myMap);
        });
        
        
    lyrClientLines = L.geoJSON.ajax('data/client_lines.geojson',
    {style:styleClientLinears, onEachFeature:processClientLinears}).addTo(myMap);

    lyrClientBUOWL = L.geoJSON.ajax('data/wildlife_buowl.geojson', 
    {style:styleBUOWL, onEachFeature:processBUOWL, filter:filterBUOWL}).addTo(myMap);
    
    lyrGBH = L.geoJSON.ajax('data/wildlife_gbh.geojson', 
    {style:{color:'fuchsia'}}).bindTooltip("GBH Nesting Area").addTo(myMap);
  
//******************** Configurar control de capa *************** */
    
    objBasemaps = {//creamos el mapa basado en objetos
        "Open Street Maps": lyrOSM,
        "Topo Map": lyrTopo,
        "Imagery": lyrImagery,
        //"Outdoors":lyrOutdoors,
        "Watercolor":lyrWatercolor
    };
    
    objOverlays = {//capas
        "Nido de Aguila": lyrNidoAguila,
        //"Nido Aguila Rapaz": lyrNidoRapaz,
        "Nido Aguila Rapaz": lyrMarkerCluster,
        "Cliente Lineas": lyrClientLines,
        "Cliente BUOWl": lyrClientBUOWL,
        "GBH Rookeries": lyrGBH,

      //  "Imagen Plaza": lyrImagenPlaza,
      "Vectores de la Zona": fgpZona
      //"Autoservicio YPF": mrkYPF,
      //"Ruta hacia YPF": plnBikeRoute,
      //"Parks": plyParks
    };

    ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(myMap);
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

    //******************** Eventos de Ubicacion *************** */


    myMap.on('locationfound', function(e){//localizacion encontrada
        console.log(e);
        if(mrkCurrentLocation){//localizacion actual esta definida 
            mrkCurrentLocation.remove();//remover
        }//esto es para que no se sigan creando varios circulos
        mrkCurrentLocation = L.circle(e.latlng,{radius: e.accuracy/2}).addTo(myMap);//creamos y agregamos un circulo marcador en la localizacion actual
        myMap.setView(e.latlng, 14);//se visualiza en la lat y long con un zoom14
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

    mrkYPF.on('dragend', function(){//cuando se mueva la marca, realizar la siguiente funcion
        mrkYPF.setTooltipContent("Ubicacion actual: "+// se establece la ubicacion actual
        mrkYPF.getLatLng().toString()+"<br>"+"Distancia a AutoServicio YPF: "+//la distancia que hay entre la ubivcaion y la ypf
        mrkYPF.getLatLng().distanceTo([-34.922526, -58.381251]).toFixed(0));//las coordenadas sin decimales
    });

    //******************** Funciones BOUWL *************** */

    function styleBUOWL(json) {
        let att = json.properties;
        let style = {};
    
        switch (att.hist_occup) {
            case 'yes':
                style = {color: 'deeppink', fillColor: 'yellow', fillOpacity: 0.5};
                break;
            case 'undetermined':
                style = {color: 'yellow', fillOpacity: 0.5};
                break;
            default:
                style = {color: 'gray', fillOpacity: 0.5}; // Valor por defecto si no coincide con ninguno
                break;
        }
    
        return style;
    }
    
    function processBUOWL(json, lyr){
        let att = json.properties;
        lyr.bindTooltip("<h4>Habitat ID: "+ att.habitat_id+ "</h4>Historically Occupied: " +att.hist_occup+ "<br>Status: "+ att.recentstatus);
    }
    
    function filterBUOWL(json){
        let att = json.properties;
        if(att.recenstatus == 'REMOVED'){
            return false;
        }else{
            return true;
        }
    }

    //******************** Client Linears *************** */

    function styleClientLinears(json) {
        let att = json.properties;
        let color = 'darkgoldenrod'; 
        switch (att.type) {
            case 'Pipeline':
                color = 'peru';
                break;
            case 'Flowline':
                color = 'navy';
                break;
            case 'Flowline, est.':
                color = 'navy';
                return { color, dashArray: "5,5" };
            case 'Electric line':
                color = 'darkgreen';
                break;
            case 'Access Road - confirmed':
                color = 'darkred';
                break;
            case 'Access Road - Estimated':
                return { color: 'darkred', dashArray: "5,5" };
            case 'Extraction':
                color = 'indigo';
                break;
        }
    
        return { color: color };
    }
    
    function processClientLinears(json, lyr){
        let att = json.properties;
        lyr.bindTooltip("<h4>Linear Project: "+ att.Project +"</h4>Type: "+ att.type +"<br> ROW Width: "+ att.row_width);
    }

    //******************** Funciones Aguila *************** */

    function returnAguilaMarker(json, latlng){
        let att = json.properties;
        let clrNido;
        //let wgtNido;
        //let opcNido;
        //let dsnNido;
        if(att.status == 'ACTIVE NEST'){
            //wgtNido = 5;
            //opcNido = 1;
            clrNido = 'red';
            //dsnNido = '';
        }else{
            //wgtNido = 7;
            //opcNido = 5;
            clrNido = 'green';
            //dsnNido = '2,8';
        }
        return L.circleMarker(latlng, {
            radius: 10,
            color: clrNido,
            //weight: wgtNido,
            //opacity: opcNido,
            fillColor: 'blue',
            fillOpacity:0.5
            //dashArray: dsnNido
        }).bindTooltip("<h4>Nido de Aguilas: " + att.nest_id + "</h4>Status: " + att.status);
    }
        /* 
        ---------------------------sprite--------------------------
     
    
    function returnAguilaMarker(json, latlng){
        let att = json.properties;
        let icnAguila;
        if(att.status =='ACTIVE NEST'){
            icnAguila = icnRedSprite;
        } else {
            icnAguila = icnVioletSprite;
            
        }
        return L.marker(latlng, {icon: icnCliente});
    }
    
    ---------------------------Awesome--------------------------
    
        
    function returnAguilaMarker(json, latlng){
        let att = json.properties;
        let icnAguila;
        if(att.status =='ACTIVE NEST'){
            icnAguila = icnLAMbird;
        } else {
            icnAguila = icnLAMtree;
        }
        return L.marker(latlng, {icon: icnAguila});
        
        ---------------------------mapkey--------------------------
        }
    function returnAguilaMarker(json, latlng){
        let att = json.properties;
        let icnAguila;
        if(att.status =='ACTIVE NEST'){
            icnAguila = icnMKbird;
        } else {
            icnAguila = icnMKtree;
        }
        return L.marker(latlng, {icon: icnAguila});
    }
       -----------------------------------------------------
    */

/*
function filterNidoAguila(json){
    let att = json.properties;
    if(att.status == 'ACTIVE NEST'){
        return true;
    } else {
        return false; 
    }
}
*/


    //******************** Funciones Rapaz *************** */

    function returnRapazMarker(json,latlng){
        let att = json.properties;
        let optRapaz;
        let radRapaz;
        switch(att.recentspecies){
            case 'Red-tail Hawk':
                radRapaz = 533;
                break;
            case 'Swainsons Hawk':
                radRapaz = 400;
                break;
            default:
                radRapaz = 804;
                break;
        }
        switch(att.recentstatus){
            case 'ACTIVE NEST':
                optRapaz = {radius: radRapaz,
                    color:'orange', 
                    fillColor:"purple", 
                    fillOpacity:0.5
                };
                break;
            
            case 'INACTIVE NEST':
                optRapaz = {radius: radRapaz,
                    color:'blue', 
                    fillColor:"purple", 
                    fillOpacity:0.5
                };
                break;
            case 'FLEDGED NEST':
                optRapaz = {radius: radRapaz,
                    color:'orange', 
                    fillColor:"purple", 
                    fillOpacity:0.5,
                    dashArray: "2,8"
                };
                break;
        }
        return L.circle(latlng, optRapaz).bindPopup("<h4>Nido de Aguila Rapaz: "+att.Nest_ID+"</h4>Estado: "+
        att.recentstatus+"<br>Especies: "+att.recentspecies+"<br>Ultimo reporte: "+att.lastsurvey);
        
    }

    //******************** Controladores de eventos JQuery*************** */


    $("#btnLocate").click(function(){
        myMap.locate();
    });
    
    $("#btnZocalo").click(function(){
        myMap.setView([-34.92386, -58.38516],17);
        myMap.openPopup(popZocalo);
    });

    $("#btnYPF").click(function(){
        myMap.setView([39.276506, -104.845276],5);
        mrkYPF.setLatLng([-34.922526, -58.381251]);
        mrkYPF.setTooltipContent("AutoServicio YPF");
    });

    $("#btnBikeRoute").click(function(){
        myMap.fitBounds(plnBikeRoute.getBounds());
    });

    $("#btnColor").click(function(){
        fgpZona.setStyle({color:'purple', fillColor:'green', fillOpacity:0.8});
    })

    $("#btnAddYPF").click(function(){
        if(fgpZona.hasLayer(mrkYPF)){
            fgpZona.removeLayer(mrkYPF);
            $("#btnAddYPF").html("Agregar la YPF al grupo de vectores");
        }else{
            fgpZona.addLayer(mrkYPF);
            $("#btnAddYPF").html("Elimina la YPF del grupo de vectores");
        };
    });

    /*$("#sldOpacity").on('change',function(){
        $("image-opacity").html(this.value);
        lyrImagenPlaza.setOpacity(this.value);
    });*/


});

    //******************** Funciones Generales *************** */

    function LatLngToArrayString(ll){//para tener una mejor vicion de la informacion
        //console.log(ll);
        return "["+ll.lat.toFixed(5)+", "+ll.lng.toFixed(5)+"]";
    }