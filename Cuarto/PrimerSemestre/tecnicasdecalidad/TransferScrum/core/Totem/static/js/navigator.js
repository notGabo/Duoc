const buttons = document.getElementsByClassName("navigator-btn");

const buttons_endpoints = ["cancel", "destino", "equipaje-asientos", "transfer", "resumen", "datos"]

buttons[0].onclick = ()=>{
    window.location.pathname = "/cancel";
}

for (let index = 1; index < buttons.length; index++) {
    const button = buttons[index];
    if (window.location.pathname === "/"+buttons_endpoints[index]) {
        button.classList.add("active");
        break;
    }
}