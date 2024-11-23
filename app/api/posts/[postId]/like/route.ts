import { connectDB } from "@/lib/db";
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    const id=await params?.postId    
    try{
        await connectDB()
        const post=await Post.findById({_id:id})
        if(!post){
            return NextResponse.json({error:"Post Not Found"})
        }
        return NextResponse.json(post.likes)
    }catch(error){
        return NextResponse.json({error:"Error Occured"+error})
        
    }
}
export const POST=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try{
        await connectDB()
        const userId=await req.json()
        // const post=await Post.findById({_id:params?.postId})
        const post=await Post.findById({_id:params?.postId})
        if(!post){
            return NextResponse.json({error:"Post Not Found"})
        }
        // acts like a hash map it doesnt take duplicate values make sures that a user can like the post only once
        await post.updateOne({$addToSet:{likes:userId}})
        await post.save()        
        return NextResponse.json({message:"Post liked Successfully"})
    }catch(error){
        return NextResponse.json({error:"Error Occured"+error})
        
    }
}