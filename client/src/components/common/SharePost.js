import React from 'react'
import PopUp from './popup'
import CreatePost from './CreatePost'
import { useNavigate } from 'react-router-dom'

const SharePost = () => {
    const navigate = useNavigate();
  return (
    <PopUp element={<CreatePost></CreatePost>} cancel={()=>navigate('/')}></PopUp>
  )
}

export default SharePost