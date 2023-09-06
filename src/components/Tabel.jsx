import React from 'react'

export default function Tabel({data}) {
  return (
    <div className="h-full bg-[#182331]">
      
      {data.map((item => (
        <div className="flex bg-[#1F2A37] w-screen lg:w-[1132px] md:w-[1132px] xl:w-[1132px] 2xl:w-[1132px] mx-auto text-white px-5 h-[50px] items-center text-[14px] font-[600] border-[#374151] border-b-[1px]">
          <div className="w-[200px] lg:w-[432px] md:w-[432px] xl:w-[432px] 2xl:w-[432px]">
            <a href={item.url} target='_blank'>
              <p>{item.url}</p>
            </a>
          </div>
          <div className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px]">
            <p>{item.tag}</p>
          </div>
          <div className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px]">
            <p 
              className ="bg-[#E8EDFD] px-2 py-[3px] text-center w-[60px] rounded-md text-[#1C4F9B]">
              {item.status}
            </p>
          </div>
        </div>
      )))
      }
    </div>
  )
}
