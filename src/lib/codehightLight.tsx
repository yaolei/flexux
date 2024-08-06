import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const codeBlockRegex = /```(\w+)\n([\s\S]*?)\n```/g;

const HighlightCodeBlocks = ({text}:{text:string}) => {
  const codeBlocks:any = [];
  let match;

  while ((match = codeBlockRegex.exec(text))) {
    codeBlocks.push({
      language: match[1],
      code: match[2],
    });
  }

  const parts = text.split(codeBlockRegex);
  if (codeBlocks.length === 0) return <div>{text}</div>;
  const elements = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      elements.push(<div key={i} className='m-2'>{parts[i]}</div>);
    } else {
      const { language, code } = codeBlocks[i / 2 - 1] || {};
    if (code) {
        elements.push(
            <SyntaxHighlighter
              key={i}
              style={docco}
              language={language}
            >
              {code}
            </SyntaxHighlighter>
            );
        }
    }
  }
  return <>{elements}</>;
};

export default HighlightCodeBlocks;