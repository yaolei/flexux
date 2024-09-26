import {readFileSync, readdirSync} from 'fs'
import path from 'path'

const  handlerGetPublicImgsList = (req, res) => {
    const imagesDirectory = path.join(process.cwd(), 'public/images/_img');
    console.log()
    const fileslists = readdirSync(imagesDirectory);
    res.status(200).send(fileslists);
}

export default handlerGetPublicImgsList;