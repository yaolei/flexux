import {NextApiRequest, NextApiResponse} from 'next'
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

 const handler  = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const data = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${ak}&client_secret=${sk}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'no-cors',
        })
        let jsonData = await req.body;
        const v = await data.json();
        const {result, id} = await getChatData(v?.access_token, jsonData)
        jsonData = [...jsonData, {'role': 'assistant', 'content':result.toString(), "id": id}]
        return res.status(200).json(jsonData)

    } catch (error) {
        console.log(error)
    }
}
export default handler

