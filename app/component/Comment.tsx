// import { IComment, ICommentDocument } from '@/model/comment.model'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import { formatDistanceToNowStrict } from 'date-fns';
import { ICommentDocument } from '@/model/comment.model';
const Comment = ({comment}:{comment:ICommentDocument}) => {
  console.log(comment.createdAt);
    const timeago = formatDistanceToNowStrict(new Date(comment.createdAt), {
        addSuffix: true,
      });
  return (
    <div className='flex gap-2 my-4 '>
        <div className='mt-2'>
            <ProfilePhoto src={comment.user.profilePhoto}/>
        </div>
        <div className='flex flex-1 justify-between p-3 bg-[#f2f2f2]'>
           <div>
           <h1 className='text-sm font-medium'>{`${comment.user.firstName} ${comment.user.lastName}`}</h1>
            <p className='text-xm text-gray-500'>@{comment.user.firstName}</p>
            <p className='my-2'>{comment.textMessage}</p>
           </div>
           <div>
            <p className='text-xs text-gray-500'>{timeago}</p>
        </div>
        </div>
        
    </div>
  )
}

export default Comment