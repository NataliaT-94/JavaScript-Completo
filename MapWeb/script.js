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
let lyrClientLinesBuffer;
let lyrBUOWL;
let lyrBUOWLbuffer;
let jsnBWOULbuffer;
let lyrGBH;
let lyrSearch;

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
let arProyectIDs = [];
let arHabitatIDs = [];
let arEagleIDs = [];
let arRaptorIDs = [];
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

    ctlScale = L.control.scale({position:'bottomleft', metric:false, maxWidth:200}).addTo(myMap);

    ctlMouseposition = L.control.mousePosition().addTo(myMap);
    

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
    {pointToLayer: returnAguilaMarker, filter:filterEagle}).addTo(myMap);
    lyrNidoAguila.on('data:Loaded', function(){
        arEagleIDs.sort(function(a,b){return a-b});
        $("#txtFindEagle").autocomplete({
            source: arEagleIDs
        });
    });
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
    {pointToLayer: returnRapazMarker, filter:filterRaptor});
    lyrNidoRapaz.on('data:loaded', function(){
        arRaptorIDs.sort(function(a,b){return a-b});
        $("#txtFindRaptor").autocomplete({
            source:arRaptorIDs
        });
        lyrMarkerCluster.clearLayers();
        lyrMarkerCluster.addLayer(lyrNidoRapaz);
        lyrMarkerCluster.addTo(myMap);
        });
        
    lyrClientLinesBuffer = L.featureGroup();
    lyrClientLines = L.geoJSON.ajax('data/client_lines.geojson',
    {style:styleClientLinears, onEachFeature:processClientLinears, filter:filterClientLines}).addTo(myMap);
    lyrClientLines.on('data:loaded', function(){
        arProyectIDs.sort(function(a,b){return a-b});
        $("#txtFindProject").autocomplete({
            source:arProyectIDs
        });

        lyrClientLinesBuffer.addTo(myMap);
        lyrClientLines.bringToFront();
    });

    lyrBUOWL = L.geoJSON.ajax('data/wildlife_buowl.geojson', 
    {style:styleBUOWL, onEachFeature:processBUOWL, filter:filterBUOWL}).addTo(myMap);
    lyrBUOWL.on('data:loaded', function(){
        arHabitatIDs.sort(function(a,b){return a-b});
        $("#txtFindBUOWL").autocomplete({
            source:arHabitatIDs
        });

        jsnBUOWLbuffer = turf.buffer(lyrBUOWL.toGeoJSON(), 0.3, 'kilometers');
        console.log(jsnBUOWLbuffer);
        lyrBUOWLbuffer = L.geoJSON(jsnBUOWLbuffer, {style:{color:'yellow', dashArray:'5,5', fillOpacity:0}}).addTo(myMap);
        lyrBUOWL.bringToFront();
        
    });

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
        "Cliente BUOWl": lyrBUOWL,
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
        console.log(e);
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
                style = {color: 'deeppink', fillColor: 'yellow'};
                break;
            case 'undetermined':
                style = {color: 'yellow'};
                break;
            default:
                style = {color: 'yellow'}; // Valor por defecto si no coincide con ninguno
                break;
        }
    
        return style;
    }
    
    function processBUOWL(json, lyr){
        let att = json.properties;
        lyr.bindTooltip("<h4>Habitat ID: "+ att.habitat_id+ "</h4>Históricamente ocupada: " +att.hist_occup+ "<br>Estado: "+ att.recentstatus);
        arHabitatIDs.push(att.habitat_id.toString());
    }
    
    function filterBUOWL(json){
        let att = json.properties;
        let optFilter = $("input[name=fltBUOWL]:checked").val();
        if(att.recenstatus == 'REMOVED'){
            return false;
        }else{
            if (optFilter == 'ALL') {
                return true;
            } else {
                return (att.hist_occup == optFilter);
            }
        }
    }
    
    $("#txtFindBUOWL").on('keyup paste', function(){
        let val = $("#txtFindBUOWL").val();
        testLayerAttribute(arHabitatIDs, val, "HABITAT ID", "#divFindBUOWL", "#divBUOWLError", "#btnFindBUOWL");
    });

    $("#btnFindBUOWL").click(function(){
        let val = $("#txtFindBUOWL").val();
        let lyr = returnLayerByAttribute(lyrBUOWL,'habitat_id',val);
        if (lyr) {
            if (lyrSearch) {
                lyrSearch.remove();
            }
            lyrSearch = L.geoJSON(lyr.toGeoJSON(), {style:{color:'red', weight:10, opacity:0.5, fillOpacity:1}}).addTo(myMap);
            myMap.fitBounds(lyr.getBounds().pad(1));
            var att = lyr.feature.properties;
            $("#divBUOWLData").html("<h4 class='text-center'>Informacion</h4><h5>Habitat: "+att.habitat+"</h5><h5>Historicamente ocupada: "+att.hist_occup+"</h5><h5>Estado Reciente: "+att.recentstatus+"</h5>");
            $("#divBUOWLError").html("");
        } else {
            $("#divBUOWLError").html("**** ID de hábitat no encontrada ****");
        }
    });
    
    $("#lblBUOWL").click(function(){
        $("#divBUOWLData").toggle(); 
    });
    
    $("input[name=fltBUOWL]").click(function(){
        arHabitatIDs = [];
        lyrBUOWL.refresh();
    });

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
    
    

/*
    function returnClientLineByID(id){//Cuadro de Busqueda
        let arLayers = lyrClientLines.getLayers();
        for (i=0; i<arLayers.length-1; i++){
            let featureID = arLayers[i].feature.properties.Project;
            if(featureID == id){
                return arLayers[i];
            }
        }
        return false;
    }
/*
    function testClienLineID(id){
        if(arProyectIDs.indexOf(id)<0){
            $("#divfindProject").addClass("has-error");
            $("#divProjectError").html("**** ID del proyecto no encontrado ****");
            $("#btnFindProject").attr("disabled", true);
        } else {
            $("#divfindProject").removeClass("has-error");
            $("#divProjectError").html("");
            $("#btnFindProject").attr("disabled", false);
        }
    }

    $("#txtFindProject").on('keyup paste', function(){
        let id = $("#txtFindProject").val();
        testClienLineID(id);
    });

    $("#btnFindProject").click(function(){
        let id = $("#txtFindProject").val();
        let lyr = returnClientLineByID(id);
        if(lyr){
            if(lyrSearch){
                lyrSearch.remove();
            }
            lyrSearch = L.geoJSON(lyr.toGeoJSON(), {style: {color: 'red', 
                                                            weight: 10,
                                                            opacity: 0.5
            }}).addTo(myMap);
            myMap.fitBounds(lyr.getBounds().pad(1));
            let att = lyr.feature.properties;
            $("#divProjectData").html("<h4 class='text-center'>Attributes</h4><h5>Type: " + att.type + 
                "</h5> <h5>ROW width: " + att.row_width + "m </h5>")
        } else{
            $("#divProjectError").html("**** ID del proyecto no encontrado ****");
        }
    });
*/
    function processClientLinears(json, lyr){
        let att = json.properties;
            lyr.bindTooltip("<h4>Proyecto lineal: "+ att.Project +"</h4>Tipo: "+ att.type +"<br> Ancho de fila: "+ att.row_width +
            "<br>Length: "+ returnMultiLength(lyr.getLatLngs()).toFixed(0));
        arProyectIDs.push(att.Project.toString());

        let jsnBuffer = turf.buffer(json, att.row_width/1000, 'kilometers');
        let lyrBuffer = L.geoJSON(jsnBuffer, {style:{ color:'gray', dashArray:'5.5'}});
        lyrClientLinesBuffer.addLayer(lyrBuffer);
    }


    function filterClientLines(json){
        let arProjectFilter = [];
        // Obtener las opciones seleccionadas
        $("input[name=fltProject]").each(function(){
            if(this.checked){
                arProjectFilter.push(this.value);
            }
        });
    
        let att = json.properties;
        switch(att.type){
            case "Pipeline":
                return arProjectFilter.includes('Pipeline');
            case "Flowline":
            case "Flowline, est.":
                return arProjectFilter.includes('Flowline');
            case "Electric Line":
                return arProjectFilter.includes('Electric');
            case "Access Road - Confirmed":
            case "Access Road - Estimated":
                return arProjectFilter.includes('Road');
            case "Extraction":
                return arProjectFilter.includes('Extraction');
            default:
                return arProjectFilter.includes('Other');
        }
    }
    
    $("#txtFindProject").on('keyup paste', function(){
        let val = $("#txtFindProject").val();
        testLayerAttribute(arProyectIDs, val, "PROJECT ID", "#divFindProject", "#divProjectError", "#btnFindProject");
    });

    $("#btnFindProject").click(function(){
        let val = $("#txtFindProject").val();
        let lyr = returnLayerByAttribute(lyrClientLines,'Project',val);
        if (lyr) {
            if (lyrSearch) {
                lyrSearch.remove();
            }
            lyrSearch = L.geoJSON(lyr.toGeoJSON(), {style:{color:'red', weight:10, opacity:0.5}}).addTo(myMap);
            myMap.fitBounds(lyr.getBounds().pad(1));
            var att = lyr.feature.properties;
            $("#divProjectData").html("<h4 class='text-center'>Informacion</h4><h5>Type: "+att.type+"</h5><h5>Ancho de fila: "+att.row_width+ "m </h5>");
            $("#divProjectError").html("");
        } else {
            $("#divProjectError").html("**** ID del proyecto no encontrado ****");
        }
    });

    $("#lblProject").click(function(){
        $("#divProjectData").toggle(); 
    });


    $("#btnProjectFilterAll").click(function(){

        $("input[name=fltProject]").prop('checked', true);
    });
    $("#btnProjectFilterNone").click(function(){
        $("input[name=fltProject]").prop('checked', false);
    });
    $("#btnProjectFilter").click(function(){
        arProyectIDs = [];
        lyrClientLines.refresh();
    });


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
        arEagleIDs.push(att.nest_id.toString());
        return L.circleMarker(latlng, {
            radius: 10,
            color: clrNido,
            //weight: wgtNido,
            //opacity: opcNido,
            fillColor: 'blue',
            fillOpacity:0.5
            //dashArray: dsnNido
        }).bindTooltip("<h4>Nido de Aguilas: " + att.nest_id + "</h4>Estado: " + att.status);
    }

    function filterEagle(json) {
        let att = json.properties;
        let optFilter = $("input[name=fltEagle]:checked").val();
        if (optFilter == 'ALL') {
            return true;
        } else {
            return (att.status == optFilter);
        }
    }
    
    $("#txtFindEagle").on('keyup paste', function(){
        let val = $("#txtFindEagle").val();
        testLayerAttribute(arEagleIDs, val, "Eagle Nest ID", "#divFindEagle", "#divEagleError", "#btnFindEagle");
    });
    
    $("#btnFindEagle").click(function(){
        let val = $("#txtFindEagle").val();
        let lyr = returnLayerByAttribute(lyrNidoAguila,'nest_id',val);
        if (lyr) {
            if (lyrSearch) {
                lyrSearch.remove();
            }
            lyrSearch = L.circle(lyr.getLatLng(), {radius:800, color:'red', weight:10, opacity:0.5, fillOpacity:0}).addTo(myMap);
            myMap.setView(lyr.getLatLng(), 14);
            let att = lyr.feature.properties;
            $("#divEagleData").html("<h4 class='text-center'>Informacion</h4><h5>Estado: "+att.status+"</h5>");
            $("#divEagleError").html("");
        } else {
            $("#divEagleError").html("**** ID de nido de águila no encontrado ****");
        }
    });
    
    $("#lblEagle").click(function(){
        $("#divEagleData").toggle(); 
    });
    
    $("input[name=fltEagle]").click(function(){
        arEagleIDs=[];
        lyrNidoAguila.refresh();
    });
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
        
        arRaptorIDs.push(att.Nest_ID.toString());
        switch(att.recentspecies){
            case 'Red-tail Hawk':
                radRapaz = 100;
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
       
        return L.circle(latlng, optRapaz).bindPopup("<h4>Nido de ave rapaz: "+att.Nest_ID+"</h4>Estado: "+att.recentstatus+"<br>Especies: "+att.recentspecies+"<br>Última encuesta: "+att.lastsurvey);
        
    }


    function filterRaptor(json) {
        let att=json.properties;
        let optFilter = $("input[name=fltRaptor]:checked").val();
        if (optFilter=='ALL') {
            return true;
        } else {
            return (att.recentstatus==optFilter);
        }
    }
    
    $("#txtFindRaptor").on('keyup paste', function(){
        let val = $("#txtFindRaptor").val();
        testLayerAttribute(arRaptorIDs, val, "Raptor Nest ID", "#divFindRaptor", "#divRaptorError", "#btnFindRaptor");
    });
    
    $("#btnFindRaptor").click(function(){
        let val = $("#txtFindRaptor").val();
        let lyr = returnLayerByAttribute(lyrNidoRapaz,'Nest_ID',val);
        if (lyr) {
            if (lyrSearch) {
                lyrSearch.remove();
            }
            let att = lyr.feature.properties;
            switch (att.recentspecies) {
                case 'Red-tail Hawk':
                    var radRaptor = 533;
                    break;
                case 'Swainsons Hawk':
                    var radRaptor = 400;
                    break;
                default:
                    var radRaptor = 804;
                    break;
            }
            lyrSearch = L.circle(lyr.getLatLng(), {radius:radRaptor, color:'red', weight:10, opacity:0.5, fillOpacity:0}).addTo(myMap);
            myMap.setView(lyr.getLatLng(), 14);
            $("#divRaptorData").html("<h4 class='text-center'>Informacion</h4><h5>Estado: "+att.recentstatus+"</h5><h5>Especies: "+att.recentspecies+"</h5><h5>Última encuesta: "+att.lastsurvey+"</h5>");
            $("#divRaptorError").html("");
        } else {
            $("#divRaptorError").html("**** ID de nido de raptor no encontrado ****");
        }
    });
    
    $("#lblRaptor").click(function(){
        $("#divRaptorData").toggle(); 
    });
    
    $("input[name=fltRaptor]").click(function(){
        arRaptorIDsIDs=[];
        lyrNidoRapaz.refresh();
    });

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

    function returnLayerByAttribute(lyr,att,val) {
        let arLayers = lyr.getLayers();
        for (i=0;i<arLayers.length-1;i++) {
            let ftrVal = arLayers[i].feature.properties[att];
            if (ftrVal==val) {
                return arLayers[i];
            }
        }
        return false;
    }
    
    function testLayerAttribute(ar, val, att, fg, err, btn) {
        if (ar.indexOf(val)<0) {
            $(fg).addClass("has-error");
            $(err).html("**** "+att+" NOT FOUND ****");
            $(btn).attr("disabled", true);
        } else {
            $(fg).removeClass("has-error");
            $(err).html("");
            $(btn).attr("disabled", false);
        }
    }

    function returnLength(arLL){
        let total = 0;
        for (let i=1; i < arLL.length; i++){
            total = total + arLL[i-1].distanceTo(arLL[i]);
        }
        return total;
    }

    function returnMultiLength(arArLL){
        let total = 0;
        for (let i=0; i < arArLL.length; i++){
            total = total + returnLength(arArLL[i]);
        }
        return total;
    }

    function returnClosestlayer(lyrGroup, llRef) {
        let arLyrs = lyrGroup.getLayers();
        let nearest = L.GeometryUtil.closestLayer(myMap, arLyrs, llRef);
        nearest.distance = llRef.distanceTo(nearest.latlng);
        nearest.bearing = L.GeometryUtil.bearing(llRef, nearest.latlng);
        if (nearest.bearing<0){
            nearest.bearing = nearest.bearing+360;
        }
        nearest.att = nearest.layer.feature.properties;
        return nearest;
    }