var contenidor, botoCaptura, botoRuta;

$(document).ready(function(){
    contenidor = $('#contenidor').hide();//De sortida el mapa ocultat
    botoCaptura = $('#botoCaptura').height('300px').width('300px').
            css('background-color', 'black').on( "keydown", captura() );
    botoRuta = $('#botoRuta');
    
});