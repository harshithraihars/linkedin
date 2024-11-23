import { Info } from 'lucide-react'
import React from 'react'
interface NAVITEMS{
  heading:string,
  subheading:string
}
const newsItems:NAVITEMS[]=[
  {
    heading:"E-retailer retag health drinks",
    subheading:"4h ago - 345 readers"
  },
  {
    heading:"let's transport raises $22 million",
    subheading:"4h ago - 3423 readers"
  },
  {
    heading:"Casual wear is in at India Inc",
    subheading:"4h ago - 234 readers"
  },
  {
    heading:"smaller cities go on Loans",
    subheading:"4h ago - 112 readers"
  },
]
const News = () => {
  return (
    <div className='hidden md:block w-[25%] bg-white h-fit rounded-lg border border-gray-300'>
      <div className='flex items-center justify-between p-3'>
        <h1 className='font-medium'>LinkedIn News</h1>
        <Info size={18}/>
      </div>
      <div>
      {
        newsItems.map((news,index)=>{
          return (
            <div key={index} className='px-3 py-2 hover:bg-gray-200 hover:cursor-pointer'>
              <h1 className='text-xs font-medium'>{news.heading}</h1>
              <p className='text-xs text-gray-600'>{news.subheading}</p>
              </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default News