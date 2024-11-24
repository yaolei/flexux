import {NextApiResponse, NextApiRequest} from 'next'
import {db} from '@/lib/db'
import fs from 'fs/promises';
import { promises as fsPromises } from 'fs';


const fetchMap3 = async (req:NextApiRequest, res:NextApiResponse) => {
    const {userId, username}  = req.body
    try {
        // const query = await db.ttsVoides.findFirst({
        //     where:{
        //         send_user_id:userId,
        //     }
        // })
        const audioName = `${username}${userId}.mp3`
        const filePath = `${process.cwd()}/public/${audioName}`;
        const query = await fs.readFile(filePath);
        if (query && Buffer.isBuffer(query)) {
        // if (query?.message_data && Buffer.isBuffer(query.message_data)) {
            const buffer = Buffer.from(query);
            // const buffer = Buffer.from(query?.message_data);
            res.setHeader('Content-Type', 'audio/mpeg');
            res.send(buffer);
            await fsPromises.unlink(filePath);
        }
    } catch (error:unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export default fetchMap3

