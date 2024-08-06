'use client';
import {useState, useEffect } from "react";
import {generateId} from 'ai'
import HighlightCodeBlocks from '@/lib/codehightLight'
const TypeWrite = ({text}:{text:string}) => {
  const [index, setIndex] = useState(0);
  const [textNode, setTextNode] = useState(''); 
  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setTextNode(prevText => prevText + text.charAt(index));
        setIndex(index + 1);
        window.scrollTo(0, document.body.scrollHeight);
      } else {
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
  const data = await fetch(`http://localhost:3000/api/chat`, {
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
  
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const daymicObj:MessagePro =  {
      id: generateId(),
      role: "user",
      content: input
    }
    setMessages([...messages, daymicObj])
    setInput("");
    setIsLoding(true);
     const tallList =  await getAccess([...messages, daymicObj]);
     setMessages(tallList)
     setIsLoding(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setInput(e?.target.value)
  }
  
  return (
    <div className="flex flex-col w-full max-w-3xl py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className={`whitespace-pre-wrap m-2 `}>
          {m.role === 'user'?
          <div className="flex justify-end items-center">
              <div className="bg-cyan-300 rounded-[6px] p-2">{m.content}</div>
              <div className="ml-2 ">
                <img src="/images/user-fill.svg" className="w-[30px] h-[30px]"/>
              </div>
          </div>:
           <div className="flex justify-start">
            <div><img src="/images/aliwangwang.svg" className="min-w-[40px] max-w-[40px]"/></div>
                <TypeWrite text={m.content} />
           </div>
          }
        </div>
      ))}
      {isLoding? 
        <div className="flex justify-start">
             <div><img src="/images/aliwangwang.svg" className="min-w-[40px] max-w-[40px]"/></div>
              <div className="ml-2 bg-rose-100 rounded-[6px] p-2"><img src="/images/loading.svg" className="w-6 animate-spin h-5  mr-3"/></div>
        </div>:null}
      <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-3xl p-2 mb-8 border border-gray-300 rounded shadow-xl"
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
          />
      </form>
    </div>
  )
}
