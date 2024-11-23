"use client"
import React, { useState } from 'react'
import ProfilePhoto from './ProfilePhoto'
import { PostDialog } from './PostDialog'
interface User{
  imageUrl:string
}
const PostInput = ({user}:{user:User}) => {
    const [open,setOpen]=useState<boolean>(false)
    const inputHandler=()=>{
        setOpen(true)
    }
  return (
    <div className='bg-white p-4 m-2 md:m-0 border-gray-300 rounded-lg'>
        <div className='flex items-center gap-3'>
            <ProfilePhoto src={user?user?.imageUrl:"/bg.jpg"}/>
            <input type='text' placeholder='Start a Post' className='rounded-xl bg-gray-100 hover:bg-gray-200 h-12 cursor-pointer w-[85%] indent-5'
            onClick={inputHandler}/>
            <PostDialog open={open} setOpen={setOpen} src={user?.imageUrl}/>
        </div>
    </div>
  )
}

export default PostInput