import {db} from '@/lib/db'
import {NextApiRequest, NextApiResponse} from 'next'
import {comparePassword} from '@/lib/setAccess'
import jwt from 'jsonwebtoken'
import {secretKey} from '@/keys/secretKey'

interface UserTokenData {
    username:string
}

const createUserToken = (data:UserTokenData, time:string) => {
    return jwt.sign(data, secretKey, {expiresIn: time})
}

const getPasswordHash = async(userName:string) => {
    const query = await db.user.findFirst({
        where:{name:userName}
    })
    return query

}

const ValidateUser = async (req:NextApiRequest, res:NextApiResponse) => {
    const { username, password} = req.body;
    const rowData = await getPasswordHash(username);
    const validatePassword = comparePassword(password, <string>rowData?.password)

    // generate new token for login user
    if (validatePassword) {
        const token = createUserToken({username:username}, '1h');
        res.setHeader('Authorization', `Bearer ${token}`);
        res.setHeader('Set-Cookie', `token=${token}; Path=/;`);
    }

    return res.status(200).json({
        validateState: validatePassword,
        validateMessage: validatePassword? "success": "Password is not correct",
    })
}

export default ValidateUser