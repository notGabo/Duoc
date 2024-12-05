// "use server"
// import { NextRequest, NextResponse } from "next/server";
// import { GetServerSideProps } from "next";
// import jwt from "jsonwebtoken";

// //const fastApiPerfil = "http://0.0.0.0:12545/perfil/";
// //const oracleLogin = "https://g722d0e58d6fa66-clasesdb.adb.sa-santiago-1.oraclecloudapps.com/ords/valortrack/api/v1/login/";

// export async function GET(request: NextRequest, response: NextResponse) {

//   const cookie = request.cookies.get("token");
//   if (cookie) {
//     const decoded = jwt.verify(cookie.value as string, "secret") as jwt.JwtPayload;
//     const userid = decoded.userid;
//     const name = decoded.name;
//     const gender = decoded.gender;
//     const parsedDate = new Date(decoded.birthdate);
//     const birthdate = `${parsedDate.getDate().toString().padStart(2, "0")}/${(parsedDate.getMonth() + 1).toString().padStart(2, "0")}/${parsedDate.getFullYear()}`;
//     const phone = decoded.phone;
//     const correo = decoded.mail;
//     const clave = decoded.password;

//     const res = await fetch('https://g722d0e58d6fa66-clasesdb.adb.sa-santiago-1.oraclecloudapps.com/ords/valortrack/api/v1/login/', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ correo, clave }),
//       credentials: "include",
//     });
    
//     if (res && res.status === 200) {
//       return new Response(
//         JSON.stringify({
//           mensaje: "Usuario logeado correctamente",
//           userid: userid,
//           name: name,
//           gender: gender,
//           birthdate: birthdate,
//           phone: phone,
//           mail: correo,
//         }),
//         {
//           status: 200,
//           statusText: res.statusText
//         }
//       );
//     }
//     return new Response("Error en el login", {
//       status: res ? res.status : 500,
//       statusText: res ? res.statusText : "Internal Server Error",
//     });

//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest, response: NextResponse) {
  try{
    const cookie = request.cookies.get("myToken");
    if (cookie) {
      const decoded = jwt.verify(cookie.value as string, 'secret') as jwt.JwtPayload;
      console.log(decoded);
      return new Response(JSON.stringify(
        { mensaje: "Usuario logeado correctamente",
          userid: decoded.userid,
          name: decoded.name, 
          gender: decoded.gender,
          birthdate: decoded.birthdate,
          phone: decoded.phone,
          mail: decoded.mail,
          password: decoded.password,

        }), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response(JSON.stringify({ mensaje: "No hay token" }), {
        status: 401,
        statusText: "Unauthorized",
      });

    }
  }
  catch(error){
    return new Response(JSON.stringify({ mensaje: "Error" }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}




