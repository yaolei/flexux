'use client';
import {useState, useEffect } from "react";
import {generateId} from 'ai'
import HighlightCodeBlocks from '@/lib/codehightLight'
import {UserCheck2Icon, UserPenIcon} from 'lucide-react'

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
     setMessages(tallList)
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
           <div className="flex justify-start">
            <div><UserCheck2Icon className="size-8"/></div>
                <TypeWrite text={m.content} typingFun={async (s) => compplateTyping(s)}/>
           </div>
          }
        </div>
      ))}
      {isLoding? 
        <div className="flex justify-start">
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
