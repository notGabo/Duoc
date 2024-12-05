import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    try{
    const { uuid } = await request.json()
    const data = await fetch(`https://valorant-api.com/v1/agents/${uuid}?language=es-ES`)
    const json = await data.json()
    return new NextResponse(JSON.stringify(json), {})
    } catch (error : any) {
        return new NextResponse(JSON.stringify({error: error.message}), {status: 500})  
    }
}


