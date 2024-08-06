import {db} from '@/lib/db'
import {withMethods} from '@/lib/api-middlewares/with-methods'
import {NextApiRequest, NextApiResponse} from 'next'

const handler = async (
    req:NextApiRequest, res:NextApiResponse
) => {
    const {name, userId} = req.body
    try {
        const newUser = await db.user.create({
            data: {
              name:name,    
              userId:userId,
            },
          });
      
        return res.status(200).json({
            error:null,
            describe: "ok"
        })
    } catch (error) {
        console.log(error)
    }

}

export default handler



