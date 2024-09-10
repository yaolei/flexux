'use server';
type RequestArgs = {
    username:string;
    password: string;
    email?: string;
}

export default async function singupAction(userprofile:RequestArgs) {
    // const url = `${location.protocol}//${location.host}/api/create-user`;
    // const queryDb = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userprofile),
    // })
    // const json = await queryDb.json()

    // if( queryDb.ok) {
    //     console.log("success new record create to db")
    //     redirect("login")
    // } else {
    //     console.log("fail create datas")
    // }
    // setTimeout(() => {
    //     console.log("222")
    //     redirect("login")
    // }, 1000)

    const resu = {
        status: "200",
        title: "Success",
        msg: "Your Account is Created Success."
    }

    return resu
}