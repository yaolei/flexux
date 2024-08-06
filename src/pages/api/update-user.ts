import {db} from '@/lib/db'
import {NextApiRequest, NextApiResponse} from 'next'

const updateUpdate = async (req:NextApiRequest, res: NextApiResponse) => {
    const {newName, id} = req.body;
    try {
        const updateUser = await db.user.update({
            where: {id: id},
            data: {
               name: newName
            }
       })
    } catch (error:unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
    return res.status(200).json({
        error:null,
        message: `User ${newName} updated succesfully`
    })
}

export default updateUpdate