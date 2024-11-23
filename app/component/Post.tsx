"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PostContent from "./PostContent";
import SocialOption from "./SocialOption";
import { IPostDocument } from "@/model/post.model";
import { deletePostAction } from "@/lib/serveraction";
import { formatDistanceToNowStrict } from "date-fns";
const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const fullName = post?.user?.firstName;
  const loggedInUser = user?.id === post?.user?.userId;
  const timeago = formatDistanceToNowStrict(new Date(post.createdAt), {
    addSuffix: true,
  });
  return (
    <div className="bg-white my-2 mx-2 md:mx-0 border border-gray-300">
      <div className="flex gap-2 p-4">
        <ProfilePhoto src={post?.user?.profilePhoto!} />
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-sm font-bold">
              {fullName} <Badge variant={"secondary"}>You</Badge>
            </h1>
            <p className="text-xs text-gray-500">{user?.username}</p>
            <p className="text-xs text-gray-500">
              {timeago}
            </p>
          </div>
        </div>
        <div>
          {loggedInUser && (
            <Button
              size={"icon"}
              onClick={() => deletePostAction(post._id)}
              className="rounded-full"
              variant={"outline"}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>
      <PostContent post={post} />
      <SocialOption post={post}/>
    </div>
  );
};

export default Post;
