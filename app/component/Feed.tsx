import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'
import { getAllPost } from '@/lib/serveraction'
interface User{
  imageUrl:string
}
const Feed = async ({user}:{user:User}) => {
  // you cant send plain object from server to client
  const userData=JSON.parse(JSON.stringify(user))
  const posts=await getAllPost()
  
  return (
    <div className='flex-1'>
      <PostInput user={userData}/>
      <Posts posts={posts}/>
    </div>
  )
}

export default Feed