var map, lat, lng, latRuta, lngRuta;
var contenidor, botoCaptura, botoRuta;

$(function () {
    contenidor = $('#contenidor');//De sortida el mapa ocultat
    botoCaptura = $('#botoCaptura').on("click", mostrar);
    botoCaptura = $('#botoCaptura').on("tap", mostrar);
    botoRuta = $('#botoRuta').on("click", marcar);
    botoRuta = $('#botoRuta').on("tap", marcar);

    function enlazar(e) {
        GMaps.geolocate({
            success: function (position) {
                //latRuta = position.coords.latitude;  // guarda coords en lat y lng
                //lngRuta = position.coords.longitude;
                latRuta = position.coords.latitude + 0.001;  // proves
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

                map.addMarker({lat: lat, lng: lng});  // pone marcador en mapa
                map.addMarker({lat: latRuta, lng: lngRuta});  // pone marcador en mapa
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
                lat = position.coords.latitude;  // guarda coords en lat y lng
                lng = position.coords.longitude;

                map = new GMaps({// muestra mapa centrado en coords [lat, lng]
                    el: '#map',
                    lat: lat,
                    lng: lng,
                    height: "400px",
                    width: "350px"
                });
                map.addMarker({lat: lat, lng: lng});  // marcador en [lat, lng]
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
    function marcar() {
        //botoRuta.hide();
        enlazar();
        //contenidor.show();
        //geolocalizar();
    }
    //geolocalizar();
});

