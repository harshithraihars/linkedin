import { connectDB } from "@/lib/db";
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try{
        await connectDB();
        const post=Post.findById({_id:params.postId})
        if(!post){
            return NextResponse.json({message:"Error Found"})
        }
        const comments=await post.populate({
            path:"comments",
            options:{sort:{createdAt:-1}}
        })
    }catch(error:any){
        return NextResponse.json({error:"Error Found"})
    }

}