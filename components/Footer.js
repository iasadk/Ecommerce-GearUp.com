import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='bg-teal-50 text-center w-full py-3 h-20 shadow-xl'>
      <div className="flex justify-center items-center  text-emerald-600 mb-1">
        <Link href="/"><span className='flex justify-center item-center hover:cursor-pointer text-xl md:text-2xl'>GearUp.com<i className="ri-anchor-line ml-2"></i></span></Link>
      </div>
      <span className='text-xs md:text-lg'>Made with 💖 by Mohammad Asad khan</span>
    </div>
  )
}

export default Footer