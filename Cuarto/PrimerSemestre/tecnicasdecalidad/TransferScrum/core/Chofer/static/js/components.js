const switches = document.querySelector("switch").addEventListener("click", (ev) =>{
    if(ev.currentTarget.getAttribute("disabled") === "true") return;
    const state = ev.currentTarget.getAttribute("value") === "true";
    ev.currentTarget.setAttribute("value", !state);

});

const sidemenu = document.getElementById("sidemenu");
function sidemenu_control(e) {
    if(e.target.id !== "sidemenu" && e.currentTarget.id !== "menu-button") return;
    
    const state = e.target.dataset.open === "true";
    sidemenu.dataset.open = !state;
}