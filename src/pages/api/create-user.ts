import {db} from '@/lib/db'
import {NextApiRequest, NextApiResponse} from 'next'
import {hashPassword} from '@/lib/setAccess'

type UserCreateInput = {
    name:string
    password:string, 
    userId:string
    createdTime: string
    lastUpdatedTime: string
}


const generateUserId = async () => {
    try {
        const userCount = await db.user.count()
        const userId = String(userCount).padStart(4, '0')
        return userId

    } catch (error:any) {
        throw new Error(error.message + "this is count error")
    }

}
const handler = async (
    req:NextApiRequest, res:NextApiResponse
) => {
    const {username, email, password} = req.body;
    const createdDate = new Date();
    try {
        const newUserId:string = await generateUserId();
        const newUser = await db.user.create({
            data: {
              name:username,
              password:hashPassword(password),  
              userId:newUserId,
              createdTime: createdDate.toISOString(),
              lastUpdatedTime: createdDate.toISOString()
            } as UserCreateInput,
          });

          const newUserEmail = await db.profile.create({
            data:{
                bio: "1", // roles
                email:email,
                user:{
                    connect:{
                        id:newUser.id,
                        userId:newUser.userId,
                    }
                }
            }  
          })
      
        return res.status(200).json({
            error:null,
            states: "ok"
        })
    } catch (error:any) {
        throw new Error(error.message)
    }

}

export default handler