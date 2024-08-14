'use client'
import {useEffect, useState} from "react";

type LogEntriesPro = {
  isError:boolean,
  lines:string[],
}

type LogRecord = LogEntriesPro[];

const getLogDatas = async () => {
    const url = `${location.protocol}//${location.host}/api/log`;
    const d = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    if (!d.ok) throw new Error
    return d.text();
}

const page = () => {
  const [logEntries, setLogEntries] = useState<LogRecord>([]);
  useEffect(()=>{
    async function fetchData() {
      const logData = await getLogDatas();
      const logLines = logData.split('\n').filter(line => line);
      let currentEntry:LogEntriesPro|null = null;
      const logRecords:LogRecord = [];

      logLines.forEach((line, index) => {
        if (line.includes('TypeError:')) {
          currentEntry = { isError: true, lines: [line] };
          logRecords.push(currentEntry);
        } else {
          // 如果行不包含 'TypeError:', 检查是否应该添加到当前记录
          if (currentEntry) {
            currentEntry.lines.push(line);
          } else {
            // 如果不是错误类型，也作为新的普通记录
            currentEntry = { isError: false, lines: [line] };
            logRecords.push(currentEntry);
          }
        }
      });


      setLogEntries(logRecords); // 设置日志数组状态
    }
    fetchData();
  },[])
  const logItemStyle = (isTypeError:boolean) => {
    return {
      backgroundColor: isTypeError ? '#ffdddd' : '#eeeeee',
      padding: '10px',
      marginBottom: '5px',
      border: '1px solid #ccc',
    };
  };

  return (
    <div className="mt-[75px]">
      {logEntries.map((entry:LogEntriesPro, index) => (
        <div key={index} className={`${entry.isError? ' bg-rose-100': 'bg-rose-50'} p-2.5 mb-1.5 border-solid border-gray-500`} >
          {entry.isError ? <h4 className="font-bold text-2xl">TypeError</h4> : <h4>Log Entry</h4>}
          {entry.lines.map((line, lineIndex) => (
            <div key={lineIndex}>{line}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default page