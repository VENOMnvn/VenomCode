import React, { useEffect, useState } from 'react'

import CodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { langs } from '@uiw/codemirror-extensions-langs';
import { EditorView } from '@uiw/react-codemirror';

const CodeRunner = () => {
    const [code,setCode] = useState(`\\your code goes here\nint main`);

    useEffect(()=>{
        console.log(langs);
    },[]);

  return (<div>
    <p>Your Code Goes here</p>
      <div className='codeRun'>
      
      <CodeMirror
      value={code}
      style={{maxHeight:"600px"}}
      onChange={(editor,state)=>{
          setCode(editor);
      }}
      theme={basicDark}
      extensions={[langs.cpp(), EditorView.editable.of(false),]}
      readOnly
      ></CodeMirror>
      
      </div>
  </div>
  )
}

export default CodeRunner;