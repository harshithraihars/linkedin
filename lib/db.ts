import mongoose, { Connection } from "mongoose"
let isconnected:Connection|boolean=false
export const connectDB=async ()=>{
    if(isconnected){
        console.log("mongodb already Connected");
        return isconnected
    }
    try{
        const res=await mongoose.connect(process.env.MONGO_URI!)
        isconnected=res.connection
        console.log("mongodb Connected");
        return isconnected
        
    }catch(error){
        if(error instanceof Error){
            console.log(error.message)            
        }        
    }
}