import {db} from '@/lib/db'
import {NextApiRequest, NextApiResponse} from 'next'
import {hashPassword} from '@/lib/setAccess'
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
        const newUserId = await generateUserId();
        const newUser = await db.user.create({
            data: {
              name:username,
              password:hashPassword(password),  
              userId:newUserId,
              createdTime: createdDate.toISOString(),
              lastUpdatedTime: createdDate.toISOString()
            },
          });

          const newUserEmail = await db.profile.create({
            data:{
                bio: "1", // roles
                email:email,
                userId:newUserId
            }
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