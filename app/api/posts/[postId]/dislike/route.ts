// import { connectDB } from "@/lib/db"
// import { Post } from "@/model/post.model";
// import { NextRequest, NextResponse } from "next/server"

// export const POST=async (req:NextRequest,{params}:{params:{postId:string}})=>{
//     try{        
//         await connectDB()
//         const userId=await req.json()
//         const post=await Post.findById(params?.postId)        
//         if(!post){
//             return NextResponse.json({error:"Post Not Found"})
//         }
//         // to pull an like from tha array
//         await post.updateOne({$pull:{likes:userId}})
//         await post.save()
//         return NextResponse.json({message:"Post disliked Successfully"})
//     }catch(error){
//         return NextResponse.json({error:error})
        
//     }
// }

import { connectDB } from "@/lib/db";
import { Post } from "@/model/post.model";
import { NextRequest, NextResponse, RouteHandlerContext } from "next/server";

export const POST = async (
  req: NextRequest,
  context: RouteHandlerContext<{ postId: string }>
) => {
  try {
    await connectDB();

    const { postId } = context.params;
    const { userId }: { userId: string } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found." },
        { status: 404 }
      );
    }

    // Pull the like from the array
    await post.updateOne({ $pull: { likes: userId } });

    return NextResponse.json({ message: "Post disliked successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while disliking the post." },
      { status: 500 }
    );
  }
};
