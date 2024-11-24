'use client';
import {useState, useEffect, useRef} from "react";
import {generateId} from 'ai'
import HighlightCodeBlocks from '@/lib/codehightLight'
import {UserCheck2Icon, UserPenIcon} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Cookies from 'js-cookie';
import {useAppSelector} from '@/lib/store'

const TypeWrite = ({text, typingFun}:{text:string, typingFun:(s:string)=>{}}) => {
  const [index, setIndex] = useState(0);
  const [textNode, setTextNode] = useState(''); 
  useEffect(() => {
    const interval = setInterval(() => {
      if (text && index < text.length) {
        setTextNode(prevText => prevText + text.charAt(index));
        setIndex(index + 1);
      } else {
        typingFun("completed")
        clearInterval(interval);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [text, index]);

  return (
      <div className="ml-2 bg-rose-100 rounded-[6px] p-2">
            <HighlightCodeBlocks text={textNode} />
      </div>
  );
}

const getAccess = async (messages:MessagePro[]) => {
  const url = `${location.protocol}//${location.host}/api/ai-chat`;
  const data = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
    method: 'POST',
  })

  if (!data.ok) throw new Error(`Error fetching`)
  return await data.json();
}

type MessagePro = {
  id:string;
  content:string;
  role: "user" | "Assistant" 
}
export default function Chat () {
  const [input, setInput] = useState("")
  const [messages, setMessages]  = useState<MessagePro[]>([]);
  const [isLoding, setIsLoding] = useState(false);
  const [typingState, SetTypingState] = useState(false);

  const [transfromWords, setTransfromWords] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const handleFetchMp3 = async(transfromSen?:string) => {
    
    // sometime when the web page refreshes the redux saving value would be lost
    // so saing the user profile data to cookies
    const cookiesuserName = await handleGetCookieData("username");
    const cookiesuserId = await handleGetCookieData("userIndex");
    if (transfromSen && transfromSen.length > 0) {

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
                "message_connent": transfromSen,
            }),
            method: 'POST',
          })
          const result = await sendTransformData.json()
          if (result.state === 'ok' && audioRef.current && cookiesuserId) {
            fetchAudio(cookiesuserId)
          }
    }
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const daymicObj:MessagePro =  {
      id: generateId(),
      role: "user",
      content: input
    }
    SetTypingState(true)
    setMessages([...messages, daymicObj])
    setInput("");
    setIsLoding(true);
     const tallList =  await getAccess([...messages, daymicObj]);
     setTransfromWords(tallList[tallList.length -1]['content'])
     setMessages(tallList)
     handleFetchMp3(tallList[tallList.length -1]['content'])
     setIsLoding(false);
  };
  
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  },[messages])







  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setInput(e?.target.value)
  }
  const compplateTyping = async (s:string) => {
    if (s === 'completed') { 
      SetTypingState(false)
    }
  }
  return (
    <div className="flex flex-col w-full max-w-3xl py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className={`whitespace-pre-wrap m-2 `}>
          {m.role === 'user'?
          <div className="flex justify-end items-center">
              <div className="bg-cyan-300 rounded-[6px] p-2">{m.content}</div>
              <div className="ml-2 ">
                <UserPenIcon className="size-8"/>
              </div>
          </div>:
           <div className="flex justify-start break-words">
            <div><UserCheck2Icon className="size-8"/></div>
                <TypeWrite text={m.content} typingFun={async (s) => compplateTyping(s)}/>
                <Button onClick={() =>handleFetchMp3(m.content)} className=" ml-2">Translate To Audio </Button>
                <div className=' hidden'> <audio ref={audioRef} controls/></div>
           </div>
          }
        </div>
      ))}
      {isLoding? 
        <div className="flex justify-start break-words">
        <div><UserCheck2Icon className="size-8"/></div>
        <div className="ml-2 bg-rose-100 rounded-[6px] p-2">
          <img src="/images/loading.svg" className="w-6 animate-spin h-5  mr-3"/>
        </div>
        </div>:null}
      <form onSubmit={handleSubmit}>
          <input
            disabled={typingState}
            className="fixed bottom-0 w-full max-w-3xl p-2 mb-8 border border-gray-300 rounded shadow-xl"
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
          />
      </form>
    </div>
  )
}
