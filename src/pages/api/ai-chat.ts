import {NextApiRequest, NextApiResponse} from 'next'
const ak = process.env.BAIDU_AK;
const sk = process.env.BAIDU_SK;

type ParamsRespose = {
    role: string;
    content:string;
}

process.env.tokens = ""
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

const getAccessToken = async () => {
    const response = await fetch(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${ak}&client_secret=${sk}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }
    const data = await response.json();
    process.env.tokens = data.access_token;
  };

 const handler  = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        if (!process.env.tokens || process.env.tokens == '') {
          await getAccessToken();
        }
        const accessToken:string = process.env.tokens||''
        const messages = req.body;

        const {result, id} = await getChatData(accessToken, messages)
        console.log(result, "%%%%%%%%%")
        const responseData  = [...messages, {'role': 'assistant', 'content':result?.toString(), "id": id}]
        return res.status(200).json(responseData)

    } catch (error) {
        console.error('Error in API handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default handler

