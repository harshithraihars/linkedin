"use server";
// import {v2 as cloudinary} from "next-cloudinary"
import { Post } from "@/model/post.model";
import { IUser } from "@/model/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./db";
import { revalidatePath } from "next/cache";
import { useUser } from "@clerk/nextjs";
import { Comment } from "@/model/comment.model";
import mongoose from "mongoose";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// creating the post
export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();
  const user: any = await currentUser();
  if (!user) {
    throw new Error("user not Authenticated");
  }
  if (!inputText) {
    throw new Error("input Field is Required");
  }
  const image = selectedFile;
  const userDatabase: IUser = {
    firstName: user.firstName || "harshith",
    lastName: user.lastName || "rai",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };
  let uploadResponse;
  try {
    // post with image
    // without image

    if (image) {
      uploadResponse = await cloudinary.uploader.upload(image);
      await Post.create({
        description: inputText,
        user: userDatabase,
        // image Url from cloudinary
        // imageUrl:image
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    // when you upload the path it should be visible in the ral time so you are playing with the cache
    revalidatePath("/");
  } catch (error: any) {
    // console.log(error.message);
    console.log(error);
  }
};

//get all post using server action
export const getAllPost = async () => {
  await connectDB();
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } }, // Corrected syntax here
      });
      if(!posts) return []
    return JSON.parse(JSON.stringify(posts));
  } catch (error: any) {
    console.log(error);
  }
};
export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) {
    throw new Error("User not Authonticated");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  } else {
    if (post.user.userId !== user.id) {
      throw new Error("You are not the owner of this post");
    }
    try {
      await post.deleteOne({ _id: postId });
      revalidatePath("/");
    } catch (error: any) {
      console.log(error);
    }
  }
};
export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("user not Authonticated");
    }
    const inputtext = formData.get("inputText") as string;
    if (!inputtext) throw new Error("message Field is Required");
    const userDatabase: IUser = {
      firstName: user.firstName || "harshith",
      lastName: user.lastName || "rai",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };
    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post not Found");
    const comment = await Comment.create({
      textMessage: inputtext,
      user: userDatabase,
    });
    post.comments?.push(comment);
    await post.save();
    revalidatePath("/");
  } catch (error) {
    throw new Error("Error ocuured");
  }
};
