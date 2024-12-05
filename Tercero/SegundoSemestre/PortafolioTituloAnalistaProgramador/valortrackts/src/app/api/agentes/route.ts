import { NextRequest, NextResponse } from "next/server";
export async function GET(reponse: NextRequest, request: NextResponse){
    try{
        const data = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=True&language=es-ES')
        const json = await data.json()
        return new NextResponse(JSON.stringify(json), {})
    } catch (error : any) {
      return new NextResponse(JSON.stringify({error: error.message}), {status: 500})  
    }
    
}
