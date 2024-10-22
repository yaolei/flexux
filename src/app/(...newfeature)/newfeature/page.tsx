'use client'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import { Mail } from "lucide-react"

import {useAppDispatch, useAppSelector} from '@/lib/store'
import {setLoginToggle, loginToggle} from '@/lib/features/loginState'

interface UserDatasTyps {
    id:string;
    name?:string;
    userId:string;
}
interface Result {
    error: unknown;
    message:UserDatasTyps[]
}

const handleQueryData = async () => {
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
    return  await queryDb.json();
}




export default function Page () {
    const [datas, setDatas] = useState<UserDatasTyps[]>([])
    const count = useAppSelector((state) => state.counter.value);
    const isLogin = useAppSelector((state) => state.isloginState.isLogin);
    const dispatch = useAppDispatch();
    const handleClickBtn = async() => {
        // const insertDb = await fetch('http://localhost:3000/api/create-user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ userId:"testID", name:"Evan" }),
        // })
        // const url = `http://${window.location.host}/api/query-user`;
        const queryDatas = await handleQueryData();
        setDatas(queryDatas.message);
    }

    return (
        <div className='mt-[75px]'>
            <button type="button" onClick={handleClickBtn} className=" rounded border-2 m-2 p-2 bg-slate-500 hover:bg-slate-600">click me!</button>
            <Button>
                <Mail className="mr-2 h-4 w-4" /> Login with Email
            </Button>
            <h1>Hello world from page.tsx! {count} </h1>

            {isLogin?<div>login success</div>:<div>no login</div>}

            <div onClick={() =>dispatch(setLoginToggle(true))}> toggle</div>

            {datas.length > 0 && datas.map((item:UserDatasTyps, i:number) => (
                <div key={item.id + i}>name: {item.name} your id: {item.userId}</div>
            ))}
         </div>
    )
}