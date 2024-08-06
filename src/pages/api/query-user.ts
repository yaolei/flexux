import {NextApiResponse, NextApiRequest} from 'next'
import {db} from '@/lib/db'

const queryHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {userId}  = req.body
    try {
        const query = await db.user.findMany({
            where:{userId:userId}
        })

        return res.status(200).json({
            error:null,
            message:query
        })

    } catch (error:unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export default queryHandler

