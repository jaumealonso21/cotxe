/* global GMaps */

var map, lat, lng, latRuta, lngRuta;
var contenidor, botoCaptura, botoRuta, menus;
var host = pais = edif = [];
var i;//On aniran le diferents opcions
var menu1, menu2, menu3, titol;
//var i = $('#img1').hide();//D'inici el div de les imatges estigui buida
var j;//Comptador d'imatges
var gal;//Seleccionador de galeries
//Font de les imatges
//var galerias = [
//    ['img/img11.jpg', 'img/img12.jpg', 'img/img13.jpg', 'img/img14.jpg'],
//    ['img/img21.jpg', 'img/img22.jpg', 'img/img23.jpg', 'img/img24.jpg'],
//    ['img/img31.jpg', 'img/img32.jpg', 'img/img33.jpg', 'img/img34.jpg']
//];
var galerias = ['img/hotel.png', 'img/landscape.png', 'img/monument.png', 'img/all.png'];
var titols = [
    ['homer', 'pollito', 'girafa', 'gatito'],
    ['banqueta', 'snoopy', 'margarita', 'patito'],
    ['osito', 'conejito', 'garfield', 'ositoSol']
];
var zones;

$(function () {
    contenidor = $('#contenidor'); //De sortida el mapa ocultat
    botoCaptura = $('#botoCaptura').on("click", mostrar);
    botoCaptura = $('#botoCaptura').on("tap", mostrar);
    botoRuta = $('#botoRuta').on("click", marcar);
    botoRuta = $('#botoRuta').on("tap", marcar);
    menus = $('#menus');
    i = $('#img1');
    j = 0;//Comença desde el principi
    gal = 0;//Evita errors
    menu1 = $('#menu1');
    menu2 = $('#menu2');
    menu3 = $('#menu3');
    titol = $('#titol');
    //Menus
    menu1.on('tap', {msg: 0}, cambioTap);
    menu2.on('tap', {msg: 1}, cambioTap);
    menu3.on('tap', {msg: 2}, cambioTap);
    titols = {
        hosteleria: [],
        paisatge: [],
        edifici: []
    };
//    var icons = {
//          parking: {
//            icon: iconBase + 'parking_lot_maps.png'
//          },
//          library: {
//            icon: iconBase + 'library_maps.png'
//          },
//          info: {
//            icon: iconBase + 'info-i_maps.png'
//          }
//        };
    //i.html(galerias[0]);
    //Capa imatge, per fer pinch in/pinch out: shift+scroll
    i.on({
        //swipeUp: cambioUp, swipeDown: cambioDown,
        swipeRight: cambioRight, swipeLeft: cambioLeft,
        singleTap: cambioTitol//, doubleTap: cambioAlbum,
                //pinchOpen: zoomOut, pinchClose: zoomIn
    });

    geoloc();

    function marcar(e) {
        lat = e.latLng.lat(); // guarda coords para marca siguiente
        lng = e.latLng.lng();
//        map.addMarker({
//            lat: lat,
//            lng: lng,
//            click: function (e) {
//                alert('You clicked in this marker');
//            }
//        });  // pone marcador en mapa
        //i.css("display", "inline-block");
        //var img = "<img src=img/choose.png alt=choose id=img1>";
        var text;
        var fav = prompt("Escull la teva secció favorita", "(H)ostaleria, \n\
(P)aisatge natural, (E)dificació d'interès");
        switch (fav) {
            case "H":
                text = "Excellent choice. Martini is good for your soul.";
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    icon: 'img/hotel.png'
                });
                break;
            case "P":
                text = "Daiquiri is my favorite too!";
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    icon: 'img/landscape.png'
                });
                break;
            case "E":
                text = "Really? Are you sure the Cosmopolitan is your favorite?";
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    icon: 'img/monument.png'
                });
                break;
            default:
                text = "I have never heard of that one..";
        }
        //css({"propertyname":"value","propertyname":"value",...});
        //i.css("top":e, "");
        map.addMarker({
            lat: lat,
            lng: lng
//            infoWindow: {
////                content: '<span id=host> Hosteleria ||</span>\n\
////                                          <span id=pais> Paisatge natural ||</span>\n\
////                                          <span id=edif> Edificació d’interès ||</span>\n\
////                                          <span id=totes> Totes </span>'
////                content: 'Esculli l\'opció preferida'
//                //content: '<div id="escollir">123</div>'
//                content: '<div id="escollir">'+galerias[0]+'</div>'
//                
//            }
        });
        //menus.show();
    }
    ;
    function enlazar(e) {
        GMaps.geolocate({
            success: function (position) {
                //latRuta = position.coords.latitude;  // guarda coords en lat y lng
                //lngRuta = position.coords.longitude;
                latRuta = position.coords.latitude + 0.001; // proves
                lngRuta = position.coords.longitude + 0.001;
                // muestra ruta entre marcas anteriores y actuales
                map.drawRoute({
                    origin: [lat, lng], // origen en coordenadas anteriores
                    // destino en coordenadas del click o toque actual
                    //destination: [e.latLng.lat(), e.latLng.lng()],
                    destination: [latRuta, lngRuta],
                    travelMode: 'driving',
                    strokeColor: '#000000',
                    strokeOpacity: 0.6,
                    strokeWeight: 5
                });
                //lat = e.latLng.lat();   // guarda coords para marca siguiente
                //lng = e.latLng.lng();

                map.addMarker({lat: lat, lng: lng}); // pone marcador en mapa
                map.addMarker({lat: latRuta, lng: lngRuta}); // pone marcador en mapa
            },
            error: function (error) {
                alert('Geolocalización falla: ' + error.message);
            },
            not_supported: function () {
                alert("Su navegador no soporta geolocalización");
            }
        });
    }
    ;
    function geoloc() {
        GMaps.geolocate({
            success: function (position) {
                lat = position.coords.latitude; // guarda coords en lat y lng
                lng = position.coords.longitude;
                map = new GMaps({// muestra mapa centrado en coords [lat, lng]
                    el: '#map',
                    lat: lat,
                    lng: lng,
                    height: "500px",
                    width: "300px",
                    click: marcar,
                    tap: marcar
                });
                //map.addMarker({lat: lat, lng: lng});  // marcador en [lat, lng]
            },
            error: function (error) {
                alert('Geolocalización falla: ' + error.message);
            },
            not_supported: function () {
                alert("Su navegador no soporta geolocalización");
            }
        });
    }

    function mostrar() {
        botoCaptura.hide();
        botoRuta.show();
        geoloc();
    }
    function marcar2() {
        botoRuta.hide();
        enlazar();
        //contenidor.show();
        //geolocalizar();
    }
    //geolocalizar();

    function cambioTap(event) {
        gal = event.data.msg;//Carrega la galeria especificada
        j = 0;//Inicialitza les imatges desde la primera
//        i.attr('src', galerias[gal][j]);
        i.attr('src', galerias[gal][j]);
        i.show();
        mostraTitol();
    }
    function cambioUp() {
        if (j >= galerias[gal].length - 1) {
            j = 0;//Si arriba al final, torna al principi
        } else {
            j++;
        }
        i.attr('src', galerias[gal][j]);
        mostraTitol();
    }
    function cambioDown() {
        if (j <= 0) {
            j = galerias[gal].length - 1;//Si arriba al principi, torna al fianl
        } else {
            j--;
        }
        i.attr('src', galerias[gal][j]);
        mostraTitol();
    }
    function cambioLeft() {
        if (gal <= 0) {
            gal = galerias.length - 1;
        } else {
            gal--;
        }
        //i.attr('src', galerias[gal][j]);
        i.attr('src', galerias[gal]);
        mostraTitol();
    }
    function cambioRight() {
        alert('djshdj');
        if (gal >= galerias.length - 1) {
            gal = 0;
        } else {
            gal++;
        }
        //i.attr('src', galerias[gal][j]);
        i.attr('src', galerias[gal]);
        mostraTitol();
    }
    function cambioTitol() {
        titol.show();
        titols[gal][j] = prompt('Escriu el títol');
        mostraTitol();
    }
    function mostraTitol() {
        titol.html(titols[gal][j]);
    }
    function cambioAlbum() {
        var alb = prompt('Escriu l\'àlbum');
        switch (gal) {
            case 0:
                menu1.html(alb);
                break;
            case 1:
                menu2.html(alb);
                break;
            case 2:
                menu3.html(alb);
                break;
            default:
                break;
        }
    }
    function zoomIn() {
        i.css('zoom', '+10%');
    }
    function zoomOut() {
        i.css('zoom', '-10%');
    }
});

