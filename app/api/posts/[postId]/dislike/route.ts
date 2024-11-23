import { connectDB } from "@/lib/db"
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server"

export const POST=async (req:NextRequest,{params}:{params:{postId:string}})=>{
    try{        
        await connectDB()
        const userId=await req.json()
        const post=await Post.findById(params?.postId)        
        if(!post){
            return NextResponse.json({error:"Post Not Found"})
        }
        // to pull an like from tha array
        await post.updateOne({$pull:{likes:userId}})
        await post.save()
        return NextResponse.json({message:"Post disliked Successfully"})
    }catch(error){
        return NextResponse.json({error:error})
        
    }
}