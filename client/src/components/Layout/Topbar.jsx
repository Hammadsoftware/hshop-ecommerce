import React from 'react'
import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

function Topbar() {
  return (
    <>
      <div className='bg-gray-800 w-full h-[30px] text-white flex justify-between items-center p-6'>
      <div className=' flex-row items-center justify-center gap-4 lg:flex hidden'>
  <a href='#' className='text-white text-2xl font-bold hover:text-black'><FaMeta /></a>
  <a href='#' className='text-white text-2xl font-bold hover:text-black'><FaInstagram /></a>
  <a href='#' className='text-white text-2xl font-bold hover:text-black'><BsTwitterX /></a>
</div>

        <div className='flex items-center justify-center'>
          <h1 className='text-white font-bold'>We ship World-wide. Fast and reliable shipping </h1>
        </div>

        <div className='  items-center justify-center gap-4 lg:flex hidden'>
          <h1 className='text-white font-bold  hover:text-black'>+92-336-5034-779</h1>
        </div>
      </div>

    </>
  )
}

export default Topbar;