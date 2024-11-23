import { Button } from "@/components/ui/button";
import { IPostDocument } from "@/model/post.model";
import { useUser } from "@clerk/nextjs";
import { MessageCircleMore, Repeat, Send, ThumbsUp } from "lucide-react";
import React, {useState } from "react";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

const SocialOption = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  
  const [commentOpen, setCommentopen] = useState(false);
  const likeDislikeHandler = async () => {
    if (!user) {
      throw new Error("User not Authonticated");
    }
    const tempLiked = liked;
    const tempLikes = likes;
    const dislike = likes?.filter((userId) => userId !== user.id);

    const like = [...(likes ?? []), user.id];
    const newlike = liked ? dislike : like;    
    setLiked(!liked);
    setLikes(newlike);
    const res = await fetch(
      `api/posts/${post._id}/${liked ? "dislike" : "like"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.id),
      }
    );
    if (!res.ok) {
      setLiked(tempLiked);
      throw new Error("faild to like");
    }
    const fetchAllLikes = await fetch(`api/posts/${post._id}/like`);
    if (!fetchAllLikes.ok) {
      setLikes(tempLikes);      
      throw new Error("FAlied to fetch like");
    }
    const likeData = await fetchAllLikes.json();
    
    setLikes(likeData);
  };
  return (
    <div>
      <div className="text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300">
          {likes && likes.length > 0 && (
            <p className="text-sm text-gray-500 hover:underline hover:cursor-pointer">
              {likes.length} likes
            </p>
          )}
          {post.comments && post.comments.length > 0 && (
            <p className="text-sm text-gray-500 hover:underline hover:cursor-pointer" onClick={()=>setCommentopen(!commentOpen)}>
              {post.comments.length} Comments
            </p>
          )}
        </div>
      <div className="flex items-center m-1 justify-between">
        <Button
          variant={"ghost"}
          className="flex items-center"
          onClick={likeDislikeHandler}
        >
          <ThumbsUp className={`${liked && 'fill-[#378Fe9]'}`}/>
          <p>Like</p>
        </Button>
        <Button variant={"ghost"} className="flex items-center" onClick={()=>setCommentopen(!commentOpen)}>
          <MessageCircleMore />
          <p>Message</p>
        </Button>
        <Button variant={"ghost"} className="flex items-center">
          <Repeat />
          <p>Repost</p>
        </Button>
        <Button variant={"ghost"} className="flex items-center">
          <Send />
          <p>Send</p>
        </Button>
      </div>
      {
        commentOpen && (
          <div className="p-4">
            <CommentInput postId={post._id}/>
            <Comments post={post}/>
          </div>
        )
      }
    </div>
  );
};

export default SocialOption;
