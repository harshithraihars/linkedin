"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createCommentAction } from '@/lib/serveraction'

const CommentInput = ({postId}:{postId:string}) => {
    const {user}=useUser()
    const commentHandler=async (formData:FormData)=>{
        try{
            if(!user){
                throw new Error("user not Authonticated")
            }
            await createCommentAction(postId,formData)

        }catch(error){
            throw new Error("An Error Occured"+error)
        }
    }
  return (
    <form action={(formData)=>commentHandler(formData)} className='flex items-center gap-2'>
        {/* <ProfilePhoto src={user?.imageUrl!}/> */}
        {user?.imageUrl && <ProfilePhoto src={user.imageUrl} />}
        <Input type='text' name="inputText" placeholder='Add a Comment' className='rounded-full'/>
        <Button type="submit" variant={"outline"} className='rounded-full'>Send</Button>
    </form>
  )
}

export default CommentInput