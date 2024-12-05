import { NextRequest } from "next/server";

const oracleRegister =
  "https://g722d0e58d6fa66-clasesdb.adb.sa-santiago-1.oraclecloudapps.com/ords/valortrack/api/v1/registrarse/";
const oracleValorant =
  "https://g722d0e58d6fa66-clasesdb.adb.sa-santiago-1.oraclecloudapps.com/ords/valortrack/api/v1/valorantuser/";

export async function POST(request: NextRequest) {
  const {nombre,genero,nacimiento,telefono,mail,clave,puuid,account_level,name,tag,last_update,region,} = await request.json(); 

  console.log(nombre,genero,nacimiento,telefono,mail,clave,puuid,account_level,name,tag,last_update,region)
  
  
  let valorantData;
  let userData;

  //valorant
  const resValorant = await fetch(oracleValorant, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      puuid,
      account_level,
      name,
      tag,
      last_update,
      region,
    }),
    credentials: "include",
  });

  //register
  const resRegistro = await fetch(oracleRegister, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, genero, nacimiento, telefono, mail, clave }),
      credentials: "include",
  });

  // console.log(resValorant)
  // console.log(resRegistro)

  valorantData = await resValorant.json();
  userData = await resRegistro.json();
  

    let errorRegister
    let errorValorant
    
    console.log('***********************************************************************')
    console.log(resRegistro)
    console.log('***********************************************************************')
    console.log(userData.items[0])
    console.log(nombre,genero,nacimiento,telefono,mail,clave)
    console.log('//register')
    console.log('***********************************************************************')
    console.log('//valorant')
    console.log(puuid,account_level,name,tag,last_update,region)
    console.log(valorantData.items[0])
    console.log('***********************************************************************')
    console.log(resValorant)
    console.log('***********************************************************************')

    if (valorantData.items[0].error) {
        errorValorant = true
    }
    if (userData.items[0].error) {
        errorRegister = true
    }
    

    if (errorRegister == true && errorValorant == true) {
        return new Response(JSON.stringify({error: "Hubo un error al registrar usuario y valorant user, Probablememente ambos ya se han registrado"}),{ status: 500, statusText: "Error al registrar usuario y valorant user", headers: { "Content-Type": "application/json" }, },);
    }
    if (errorRegister == true) {
        return new Response(JSON.stringify({error: "Hubo un error al registrar usuario de nuestro servicio y solo hemos podido registrar al usuario de valorant. Probablememente tu correo ya ha sido registrado"}),{ status: 500, statusText: "Error al registrar usuario", headers: { "Content-Type": "application/json" }, },);
    }
    if (errorValorant == true) {
        return new Response(JSON.stringify({error: "Hubo un error al registrar el usuario de valorant y solo hemos podido registrar al usuario de nuestro servicio. Probablemente la cuenta de valorant ya se ha vinculado a otra"}),{ status: 500, statusText: "Error al registrar valorant user", headers: { "Content-Type": "application/json" }, },);
    }

  return new Response(
      JSON.stringify({
          userid: userData.items[0].userid,
          name: userData.items[0].name,
        valorantName: valorantData.items[0].name+'#'+valorantData.items[0].tag,
          mensaje: 'Registro exitoso'
      }), {status: 200, statusText: "Registro exitoso", headers: {"Content-Type": "application/json"},});
}
