import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'
import { getAllPost } from '@/lib/serveraction'

const Feed = async ({user}:{user:any}) => {
  // you cant send plain object from server to client
  const userData=JSON.parse(JSON.stringify(user))
  const posts:any=await getAllPost()
  
  return (
    <div className='flex-1'>
      <PostInput user={userData}/>
      <Posts posts={posts}/>
    </div>
  )
}

export default Feed