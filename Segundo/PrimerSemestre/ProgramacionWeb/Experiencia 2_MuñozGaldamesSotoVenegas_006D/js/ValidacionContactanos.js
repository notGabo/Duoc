$(document).ready(function(){
   jQuery.validator.addMethod("noEspacio", function(value, element) { 
      return value == '' || value.trim().length != 0;  
    }, "No espacios, y por favor no dejes este campo vacio");
  
    jQuery.validator.addMethod("customEmail", function(value, element) { 
    return this.optional( element ) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value ); 
    }, "Porfavor, ingresa un correo valido. Ejemplo: correo@mail.com");
  
    jQuery.validator.addMethod("customNombre", function(value, element) { 
      return this.optional( element ) || /^([a-zA-Z])+$/.test( value ); 
      }, "Porfavor, solo letras");


   var $contactoform = $('#FormularioContacto');
   if($contactoform.length){
      $contactoform.validate({
         rules:{
            nombre:{
               required: true,
               minlength: 3,
               customNombre: true
            },
            telefono:{
               number: true,
               minlength:9,
               maxlength:11,
               noEspacio: true
            },
            email:{
               required: true,
               noEspacio: true,
               customEmail: true
            },
            mensaje:{
               required: false,
               minlength:10,
               maxlength: 50
            },
            problema:{
               required:true
            }
         },
         messages:{
            nombre:{
               required: 'El nombre es obligatorio.',
               minlength: 'CACApoto'
            },
            telefono:{
               minlength: 'El numero tiene que tener al menos 9 digitos',
               maxlength: 'El numero no puede superar los 11 digitos'
            },
            email:{
               required: 'El correo es obligatorio.',
               email:'Ingrese un correo valido.'
            },
            mensaje:{
               minlength:'El mensaje no puede ser menor a 10 caracteres',
               maxlength:'El mensaje no puede ser mayor a 50 caracteres'
            },
            problema:{
               required:'Debes elegir un tipo problema'
            }
         }
      });
   }
});