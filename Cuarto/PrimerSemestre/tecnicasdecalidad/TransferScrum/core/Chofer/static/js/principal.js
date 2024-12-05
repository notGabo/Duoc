function changeStatus(e){

    const value = e.currentTarget.getAttribute("value") === "true";
    const status = !value ? "online": "offline";
    document.getElementById("status-text").textContent = !value ? "ONLINE" : "OFFLINE";
    document.getElementById("offline-message").dataset.active = value;

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(`http://localhost:8002/chofer/cambiar-status-transfer?id_transfer=${id_transfer}&status=${status}`, requestOptions)
    .catch(error => console.log('error', error));

}

function checkIncomingReservas(){

    fetch("http://localhost:8002/chofer/obtener-status-transfer?id_transfer="+id_transfer, {method:"GET"})
    .then(response => response.json())
    .then(result => {
        //console.log(result);
        if(result.status === "reservado"){
            document.querySelector("switch").setAttribute("disabled", "true");
            reservado();
            return;
        }else{
            setTimeout(checkIncomingReservas, 2000);
        }
    })
    .catch(error => console.log('error', error));
    
}

function reservado(){
    fetch("http://localhost:8002/chofer/obtener-info-reserva?id_transfer="+id_transfer, {method:"GET"})
    .then(response => response.json())
    .then(result => {
        //console.log(result);

        let address_text = document.getElementById("travel-address");
        if(result.destino.includes("|")){
            const address = result.destino.substring(0, result.destino.indexOf("|"));
            const place = result.destino.substring(result.destino.indexOf("|"));
            address_text.innerHTML = `<i class="bi bi-signpost-fill"></i> ${address}<br><b><i class="bi bi-geo-fill"></i> ${place}</b>`;
        }else{
            address_text.innerHTML = `<i class="bi bi-signpost-fill"></i> ${result.destino}`;
        }
        
        document.getElementById("reserva-cliente").innerText = result.cliente_name;
        document.getElementById("reserva-asientos").innerText = result.cant_asientos;
        document.getElementById("reserva-equipaje").innerText = result.cant_equipaje;
        
        document.getElementById("reserva-pivot").dataset.active = true;
        document.getElementById("cancel-reserva").onclick = ()=>{

            const reserva = result.reserva_id;
            
            fetch(`http://localhost:8002/chofer/cancelar-reserva?id_reserva=${reserva}`, {method:"GET"})
            .catch(error => console.log('error', error))
            .finally(()=>{
                fetch(`http://localhost:8002/chofer/cambiar-status-transfer?id_transfer=${id_transfer}&status=online`, {method:"POST"})
                .catch(error => console.log('error', error))
                .finally(()=>{
                    document.getElementById("reserva-pivot").dataset.active = false;
                    document.querySelector("switch").setAttribute("disabled", "false");
                    checkIncomingReservas();
                });
            });
        };
    })
    .catch(error => console.log('error', error));
}