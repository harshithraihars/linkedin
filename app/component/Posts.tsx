import React from 'react'
import Post from './Post'
import { IPostDocument } from '@/model/post.model'

const Posts = ({posts}:{posts:IPostDocument[]}) => {
  
  return (
    <div>
      {
        posts.map((post,index)=>{
          return (
            <Post post={post} key={index}/>
          )
        })
      }
    </div>
  )
}

export default Posts