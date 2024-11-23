import { IPostDocument } from '@/model/post.model'
import React from 'react'
import Comment from './Comment'

const Comments = ({post}:{post:IPostDocument}) => {  
  return (
    <div>
      {
        post?.comments.map((comment,index)=>{
          return (
            <Comment key={index} comment={comment}/>
          )
        })
      }
    </div>
  )
}

export default Comments