'use client'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import { Mail } from "lucide-react"
interface UserDatasTyps {
    id:string;
    name?:string;
    userId:string;
}
interface Result {
    error: unknown;
    message:UserDatasTyps[]
}


export default function Page () {
    const [datas, setDatas] = useState<UserDatasTyps[]>([])
    const handleClickBtn = async() => {
        // const insertDb = await fetch('http://localhost:3000/api/create-user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ userId:"testID", name:"Evan" }),
        // })
        // const url = `http://${window.location.host}/api/query-user`;
        const url = "http://localhost:3000/api/query-user"
        const queryDb = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId:"testID"}),
        })
        if( queryDb.ok) {
            console.log("success query to db")
        } else {
            console.log("fail to query to db")
        }
        const result:Result = await queryDb.json();
        setDatas(result.message);
    }

    return (
        <div>
            <button type="button" onClick={handleClickBtn} className=" rounded border-2 m-2 p-2 bg-slate-500 hover:bg-slate-600">click me!</button>
            <Button>
                <Mail className="mr-2 h-4 w-4" /> Login with Email
            </Button>
            <h1>Hello world from page.tsx!</h1>
            {datas.length > 0 && datas.map((item:UserDatasTyps, i:number) => (
                <div key={item.id + i}>name: {item.name} your id: {item.userId}</div>
            ))}
         </div>
    )
}