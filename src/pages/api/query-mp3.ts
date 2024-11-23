import {NextApiResponse, NextApiRequest} from 'next'
import {db} from '@/lib/db'

const fetchMap3 = async (req:NextApiRequest, res:NextApiResponse) => {
    const {userId}  = req.body
    try {
        const query = await db.ttsVoides.findFirst({
            where:{
                send_user_id:userId,
            }
        })
        if (query?.message_data && Buffer.isBuffer(query.message_data)) {
            
            const buffer = Buffer.from(query?.message_data);
            res.setHeader('Content-Type', 'audio/mpeg');
            res.send(buffer);
        }
    } catch (error:unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export default fetchMap3

