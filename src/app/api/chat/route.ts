import type { NextRequest, NextResponse } from 'next/server';
const ak = process.env.BAIDU_AK;
const sk = process.env.BAIDU_SK;

type ParamsRespose = {
    role: string;
    content:string;
}

const getChatData = async (token:string, messages: ParamsRespose[] ) => {
    const options = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-speed-128k?access_token=${token}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            "messages": messages
        })
    })
    if (!options.ok) throw new Error(`Error fetching chat data`)
    return await options.json()
}

export async function POST (req:NextRequest, res: NextResponse)  {
    const data = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${ak}&client_secret=${sk}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'no-cors',
    })
    const messages = await req.text()
    let jsonData = JSON.parse(messages);

    const v = await data.json();
    const {result, id} = await getChatData(v?.access_token, jsonData)

    jsonData = [...jsonData, {'role': 'assistant', 'content':result.toString(), "id": id}]
    return Response.json(jsonData)

}