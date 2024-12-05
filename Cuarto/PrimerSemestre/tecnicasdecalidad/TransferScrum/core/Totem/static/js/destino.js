let isScrolling = false;
const result_container = document.getElementById("search-result");

result_container.addEventListener("mousedown", ()=>{
  isScrolling = true;
});
result_container.addEventListener("mouseup", ()=>{
  isScrolling = false;
});
result_container.addEventListener("mouseleave", ()=>{
  isScrolling = false;
});
result_container.addEventListener("mousemove", (e)=>{
  if (!isScrolling) return;
  result_container.scrollBy(0, -e.movementY);
});

function buscarDestino(e) {
    const input_value = e.target.value.trim();
    
    if (input_value) {
      const query = encodeURI(input_value)
        
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
          
      fetch(`https://api.tomtom.com/search/2/search/${query}.json?key=FjiYm2OcMMfV2yq71bJE1ycq1xESbZqn&countrySet=CL&lat=-33.40327487412867&lon=-70.79054124108268&language=es-419&limit=15&radius=100000`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          const result_container = document.getElementById("search-result");
          result_container.hidden = false;
          result_container.innerHTML = "";

          for (const element of result["results"]) {
            let result_html;
            const address = element["address"];
            
            switch (element["type"]) {
              case "POI":
                const poi_category = element["poi"]["classifications"][0]["code"];
                let poi_icon;
                switch (poi_category) {
                  case "PUBLIC_TRANSPORT_STOP":
                    continue;
                    break;
                  case "RAILWAY_STATION":
                    poi_icon = `<i class="bi bi-train-front-fill"></i>`;
                    break;
                  case "MARKET":
                    poi_icon = `<i class="bi bi-cart-fill"></i>`;
                    break;
                  case "HOTEL_MOTEL":
                    poi_icon = `<i class="bi bi-building-fill"></i>`;
                    break;
                  default:
                    poi_icon = `<i class="bi bi-geo-alt-fill"></i>`;
                    break;
                }

                console.log(element["type"], element["poi"], address);

                result_html = `${poi_icon} ${address["municipalitySubdivision"] ?? address["municipality"]}, ${address["streetName"]}<br><strong>${element["poi"]["name"]}</strong>`;

                break;
              case "Street":
                result_html = `<i class="bi bi-signpost-2-fill"></i> ${address["municipalitySubdivision"] ?? address["municipality"]}, ${address["streetName"]}`;
                break;
              case "Cross Street":
                result_html = `<i class="bi bi-sign-intersection-side-fill"></i> ${address["municipalitySubdivision"] ?? address["municipality"]}, ${address["streetName"]}`;
                break;
              case "Point Address":
                result_html = `<i class="bi bi-geo-fill"></i> ${address["municipalitySubdivision"] ?? address["municipality"]}, ${address["streetName"]} ${address["streetNumber"]}`;
                break;
              
              // salta iteracion
              default:
                continue;
            }
            
            let item_html = document.createElement("li");
            item_html.classList.add("item-result");
            item_html.dataset.lon = element["position"]["lon"];
            item_html.dataset.lat = element["position"]["lat"];

            item_html.innerHTML = result_html;

            result_container.appendChild(item_html);

            item_html.addEventListener("click", selectRoute);

          }
        })
        .catch(error => console.log('error', error));
      
    }else{
      result_container.hidden = true;
    }
}

const eta_element = document.getElementById("eta-text");

function selectRoute(event) {
  const lon = event.currentTarget.dataset.lon;
  const lat = event.currentTarget.dataset.lat;
  const node_children = event.currentTarget.childNodes;
  let address = "";

  for (let index = 1; index < node_children.length; index++) {
    const node = node_children[index];
    
    if(!node.textContent) continue;
    console.log(node.textContent);
    
    address += node.tagName === "STRONG" ? `|${node.textContent}` : node.textContent;
  }

  map.easeTo({center:{lon:lon, lat:lat}, zoom:17, animate:true, duration:3000, essential:true});
  
  marker.setLngLat([lon, lat]);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const request_url = `https://api.tomtom.com/routing/1/calculateRoute/-33.40327487412867,-70.79054124108268:${lat},${lon}/json?key=FjiYm2OcMMfV2yq71bJE1ycq1xESbZqn&instructionsType=text&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&vehicleMaxSpeed=120&language=es-MX`;
  
  fetch(request_url, requestOptions)
    .then(response => response.json())
    .then(result =>{

      let eta_result = result["routes"][0]["summary"]["travelTimeInSeconds"]/60;
      const eta_data = result["routes"][0]["summary"]["travelTimeInSeconds"];
      const distance_data = result["routes"][0]["summary"]["lengthInMeters"];

      if(eta_result >= 60){
        eta_result =`${Math.round(eta_result/60)} horas y ${Math.round(eta_result%60)} minutos`;
      }else{
        eta_result =`${Math.round(eta_result)} minutos`;
      }

      eta_element.innerText = eta_result;
      document.getElementById("eta").value = eta_data;
      document.getElementById("distance").value = distance_data;
      document.getElementById("latitude").value = lat;
      document.getElementById("longitude").value = lon;
      document.getElementById("address").value = address.trim();

    })
    .catch(error => console.log('error', error));
  
  result_container.hidden = true;
}