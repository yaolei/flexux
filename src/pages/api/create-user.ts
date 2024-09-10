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

type UserProile = {
    bio: string
    email:string
    userId:string
}

const generateUserId = async () => {
    const userCount = await db.user.count()
    const userId = String(userCount).padStart(4, '0')
    return userId
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
                userId:newUserId
            } as UserProile
          })
      
        return res.status(200).json({
            error:null,
            states: "ok"
        })
    } catch (error) {
        console.log(error)
    }

}

export default handler