$(document).ready(function (){
  $( "#logout" ).click(function() {
    var cookies_dict = [];
    var cookies_array = document.cookie.split(';');
    var csrftoken;
    cookies_array.forEach(elem => {
      var temp = elem.split('=');
      cookies_dict.push({
          key: temp[0],
          value: temp[1]
      });
    });
    cookies_dict.forEach(elem => {
      if(elem.key == 'csrftoken') {
        csrftoken = elem.value;
      }
  })
    $.ajax({
      url:'/api/v1/logout',
      type: 'POST',
      data: {csrfmiddlewaretoken: csrftoken},
      success: function(){
        location.reload();        
      } 
    })
 });
});

$(document).ready(function(){
  $("button").click(function(){
    //$.post("http://lisa.analytics.cl:34608/?url="+url,
    //{
    //  url:$("#campoURL").val()
    //},
    //function(data,status){
    //  alert("URL ingresada: " + data + "\nStatus: " + status);
    //});

    var url = $("#campoURL").val();

    var settings = {
      "url": "http://lisa.analytics.cl:34608/?url="+url,
      "method": "POST",
      "timeout": 0,
    };
    
    $ajax(settings).done(function (response) {
      alert(response);
    });
  });
});

$(function(){
  $('#botonURL').click(function(){
     $.post('http://lisa.analytics.cl:34608',{
         url:  $("#campoURL").val()      
      }, function(data,status){
          window.alert(data+" "+status);
          console.log(data+" "+status);
      }); 
  });
});


  //$(document).ready(function(){
  //  $("#botonURL").click(function(){
  //      
  //    //$.post("http://lisa.analytics.cl:34608/?url="+url,
  //    //{
  //    //  url:$("#campoURL").val()
  //    //},
  //    //function(data,status){
  //    //  alert("URL ingresada: " + data + "\nStatus: " + status);
  //    //});
  //
  //    var url = $("#campoURL").val();
  //    
  //    var settings = {
  //      "url": "http://lisa.analytics.cl:34608/?url="+url,
  //      "method": "POST",
  //      "timeout": 0,
  //    };
  //    
  //    $.ajax(settings).done(function (response) {
  //      window.alert(response);
  //    });
  //  });
  //});
