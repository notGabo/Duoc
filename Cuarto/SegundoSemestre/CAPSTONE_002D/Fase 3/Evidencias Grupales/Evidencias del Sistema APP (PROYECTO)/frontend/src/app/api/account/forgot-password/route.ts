export async function POST(request:Request){
    const body = await request.json()
    const apiUrl = `${process.env.API_URL}/account/password/recover`;
    if (process.env.CURRENT_ENV === 'dev'){
        body.dev = true;
    }
    try{
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }catch(error){
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 501, headers: { 'Content-Type': 'application/json' } });
    }
}