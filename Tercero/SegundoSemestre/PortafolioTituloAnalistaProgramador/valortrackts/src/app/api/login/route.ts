import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'


const oracleLogin = 'https://g722d0e58d6fa66-clasesdb.adb.sa-santiago-1.oraclecloudapps.com/ords/valortrack/api/v1/login/'
export async function GET() {
  return new Response('Se debe ejecutar un POST con parametros de mail y clave. Saludos!')
}

export async function POST(request: NextRequest) {
  const { mail,clave } = await request.json()
  console.log(mail,clave)
  const res = await fetch(oracleLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail, clave }),
  })

  // if data status is not 200, return the error
  console.log(res)
  // print if the body has content or an error
  console.log(res.body)
  console.log(res.status)
  console.log(res.statusText)
  console.log(res.headers)
  console.log(res.url)
  
  if (res.status !== 200 ) {
        return new Response('Error en el login', { status: 401 })
      }
    // if data status is 200, return the data
    const data = await res.json()
    console.log(data)
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        userid: data.items[0].userid,
        name: data.items[0].name,
        gender: data.items[0].gender,
        birthdate: data.items[0].birthdate,
        phone: data.items[0].phone,
        mail: data.items[0].mail,
        password: data.items[0].password,
      }, 'secret')
    const serialized = serialize('myToken', token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/',
    })

    const response = new Response(JSON.stringify({
        userid: data.items[0].userid,
        name: data.items[0].name,
        gender: data.items[0].gender,
        birthdate: data.items[0].birthdate,
        phone: data.items[0].phone,
        mail: data.items[0].mail,
    }))
    response.headers.set('Set-Cookie', serialized)
    return response
    }
