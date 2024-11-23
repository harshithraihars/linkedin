import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const readFileasDataurl=(file:File|Blob):Promise<string>=>{
  return new Promise((resolve)=>{
    const fileReader=new FileReader()
    // when the reading is finished either normally or ubnormally
    fileReader.onloadend=()=>{
      // if the content of the file is String then return
      if(typeof fileReader.result==="string") return resolve(fileReader.result)
    }
  // tells the FileRedaer to read the file content and convert into url
    fileReader.readAsDataURL(file)
  })
}
