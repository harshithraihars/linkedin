import Feed from "./component/Feed";
import News from "./component/News";
import Sidebar from "./component/Sidebar";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user=await currentUser()  
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-center gap-8">
        <Sidebar user={user}/>
        <Feed user={user}/>
        <News/>
      </div>
    </div>
  );
}
