
document.getElementById("ingresar").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    var correo = document.getElementById('correoIngreso').value;
    var contraseña = document.getElementById('contraseña').value;


    if (correo === 'correo@gmail.com' && contraseña === '12345678') {

        window.location.href = "Pedir_Tranfer";  
    } else {
        alert("Ingrese los datos correctos");
    }
});



document.addEventListener('DOMContentLoaded', function() {
    var myCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
        interval: 3000,  // Intervalo en milisegundos (3 segundos en este caso)
        wrap: true       // Permite que el carrusel se mueva de forma continua
    });
});
