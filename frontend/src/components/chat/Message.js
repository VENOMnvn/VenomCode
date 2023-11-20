import React from 'react'

const Message = (props) => {
  return (<div className={props.owner ? "right-message message":"left-message message"}>
                <div className='message-content'>
                    <p>{props.msg}</p>
                </div>                
         </div>
  )
}

export default Message