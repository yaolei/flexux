import {db} from '@/lib/db'
import {NextApiRequest, NextApiResponse} from 'next'
import {hashPassword} from '@/lib/setAccess'
import jwt from 'jsonwebtoken'
import {secretKey} from '@/keys/secretKey'
import { stat } from 'fs'


type UserCreateInput = {
    name:string
    password:string, 
    userId:string
    createdTime: string
    lastUpdatedTime: string
}

interface UserTokenData {
    username:string
}

const validateNewUserExist = async (userName:string) => {
    const query = await db.user.findFirst({
        where:{name:userName}
    })
    return query
}

const createUserToken = (data:UserTokenData, time:string) => {
    return jwt.sign(data, secretKey, {expiresIn: time})
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
        const existUser = await validateNewUserExist(username);
        if (existUser?.name) {

            return res.status(401).json({
                error: true,
                states: '401',
                message:"User already exists"
            })
        } else {
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

            const token = createUserToken({username:username}, '1h');
            res.setHeader('Authorization', `Bearer ${token}`);
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
        }

        return res.status(200).json({
            error: false,
            states: "ok",
            message:"User create successful",
        })
    } catch (error:any) {
        throw new Error(error.message)
    }

}

export default handler