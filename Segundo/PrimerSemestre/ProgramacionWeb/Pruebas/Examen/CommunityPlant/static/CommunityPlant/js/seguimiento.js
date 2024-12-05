function ajaxote() {
    var codigoSeguimiento = $('#consultaSeguimiento').val();
    $.ajax({
        url: `/api/detalle_boleta/${codigoSeguimiento}/`,
        type: 'GET',
        success: function(data){
            var fecha_pedido = new Date(data.fecha);
            var fecha_actual = new Date();
            console.log(fecha_pedido);
            console.log(fecha_actual);
            dias_diff = parseInt((fecha_actual - fecha_pedido) / (1000 * 60 * 60 * 24));
            $("#mensajeConsulta")[0].outerHTML = '';
            if (dias_diff <= 2) {
                $('#barrita_progreso')[0].style.width = "25%";
            }
            else if (dias_diff == 3 || dias_diff == 4) {
                $('#barrita_progreso')[0].style.width = "50%";
            }
            else if (dias_diff == 5 || dias_diff == 6) {
                $('#barrita_progreso')[0].style.width = "75%";
            }
            else {
                $('#barrita_progreso')[0].style.width = "100%";
            }
        },
        error: function(){
            noEncontrada = "<p id='mensajeConsulta' name='mensajeConsulta' style='color:#FF0000; margin-top:1%'>No se ha encontrado el pedido ingresado</p>";
            $("#mensajeConsulta")[0].outerHTML = noEncontrada;
        }
    });
}

$(document).ready(function(){
    $("#btnConsultaPedido").click(ajaxote);
});

var botonActualizar;
botonActualizar = document.getElementById('btnNuevoPedido');
botonActualizar.addEventListener('click', function(){
  location.replace('seguimiento.html');
})


