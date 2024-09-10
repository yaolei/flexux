import bcrypt from 'bcryptjs';

const hashLen:number = 10
const hashPassword = (pwd:string) => {
    return bcrypt.hashSync(pwd, hashLen)
}
 
const comparePassword = (pwd:string, hash: string) =>{
    return bcrypt.compareSync(pwd, hash)
}

export {
    hashPassword,
    comparePassword
} 