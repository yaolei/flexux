'use client'
import {useRef} from 'react'
import {Button} from '@/components/ui/button'
import Cookies from 'js-cookie';
import {useAppSelector} from '@/lib/store'

export default function Page () {
    const isLogin = useAppSelector((state) => state.isloginState.isLogin);
    const audioRef = useRef<HTMLAudioElement>(null);
    const textAreRef = useRef<HTMLTextAreaElement>(null);
    const {userIndex, username} = useAppSelector((state) => state.userProfile)

    const fetchAudio = async (userId:string) => {
     
        let url = `https://${window.location.host}/api/query-mp3`;
        if (window.location.hostname == 'localhost') {
            url = `http://${window.location.host}/api/query-mp3`;
        }
          try {
            const response = await fetch(url,{
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userId}),
                method: 'POST'
            });
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            
            if (audioRef.current) {
              audioRef.current.src = audioUrl;
              const playPromise = audioRef.current.play();
            //   if (playPromise !== undefined) {
            //     playPromise.then(() => {
            //     }).catch((error) => {
            //       console.error('Audio playback failed:', error);
            //     });
            //   }
            }
          } catch (error) {
            console.error('Error fetching audio file:', error);
          }
        };


    const handleGetCookieData = async (key:string) => {
        const cookieObj = Cookies.get('flexuxprofile');
        const cookieArr =  cookieObj?.split('-')
        if (cookieArr) {
            for (let k = 0; k <= cookieArr.length; k++) {
                if (cookieArr[k].includes(key)) {
                    return cookieArr[k].split("=")[1]; 
                }
            }
        }
    }

    const handleFetchMp3 = async() => {
        // sometime when the web page refreshes the redux saving value would be lost
        // so saing the user profile data to cookies
        const cookiesuserName = await handleGetCookieData("username");
        const cookiesuserId = await handleGetCookieData("userIndex");
        if (textAreRef.current && textAreRef.current.value.length > 0) {

            let transfromBackEndUrl = `https://${window.location.hostname}/pytts/tts`;
            if (window.location.hostname == 'localhost') {
                transfromBackEndUrl = `http://${window.location.hostname}:8000/pytts/tts`
            }
            const sendTransformData = await fetch(transfromBackEndUrl, {
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "send_by_name": username == ''? cookiesuserName: username,
                    "send_by_id": userIndex == ''? cookiesuserId: userIndex,
                    "message_id": userIndex == ''? cookiesuserId: userIndex,
                    "message_connent": textAreRef.current.value,
                }),
                method: 'POST',
              })
              const result = await sendTransformData.json()
              if (result.state === 'ok' && audioRef.current && cookiesuserId) {
                fetchAudio(cookiesuserId)
              }
        }
    }
    
    return (
        <div className='mt-[75px]'>
            {isLogin?<div>login success</div>:<div>no login</div>}
            <div className='flex justify-around items-center'>
                <div className='border-2 '>
                    <textarea className=' h-28' ref={textAreRef}/>
                </div>
                <div>
                    <Button onClick={handleFetchMp3}>Translate To Audio </Button>
                    <div className=' hidden'> <audio ref={audioRef} controls/></div>
                </div>
            </div>
         </div>
    )
}