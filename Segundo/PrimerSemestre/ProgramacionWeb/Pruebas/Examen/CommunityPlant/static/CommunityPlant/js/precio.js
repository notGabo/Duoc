function query(){
  var suscripcion;
  var username;
  $.ajax({
    url:"http://127.0.0.1:8000/api/lista_suscritos?format=json",
    type: "GET",
    success: function(resultado){
      for (elem of resultado){
        username = elem.username
        suscripcion = elem.suscripcion;
      };
    }
  });
};

$(document).ready(function(){
    var precioTotal;
    var descuento;
    precioTotal = 0;
    descuento = 0;
    $('.calculoPrecioUnitario').each(function(index){
        precioTotal += parseInt($(this).html());  
    });

    $('#precioTotal').html('Precio total: $' + (precioTotal));

    if(suscripcion == true){
    $('#checkDescuento').click(function() {
        setTimeout(function() {
          descuento = parseInt($('#valorDescuento').html());
          $('#precioTotal').html('Precio total: $' + (precioTotal - (precioTotal * (descuento/100))));
        }, 1000);
      }); 
    }
});
