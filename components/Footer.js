import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='bg-teal-50 text-center w-full py-3 h-40 md:h-32 shadow-xl'>
      <div className="flex justify-center items-center  text-emerald-600 mb-1 gap-y-5">
        <Link href="/"><span className='flex justify-center item-center hover:cursor-pointer text-xl md:text-2xl'>GearUp.com<i className="ri-anchor-line ml-2"></i></span></Link>
      </div>
      <span className='text-xs md:text-lg'>Made with 💖 by Mohammad Asad khan</span>
      <div>
        <div className='flex gap-x-4 items-center justify-center'>
          <Link href={"https://www.instagram.com/iasad.0017/"}>
            <a className='text-lg md:text-xl' target="_blank"><i className="ri-instagram-line"></i></a>
          </Link>
          <Link href={"https://github.com/iasadk"} >
            <a className='text-lg md:text-xl' target="_blank"><i className="ri-github-fill"></i></a>
          </Link>
          <Link href={"https://www.linkedin.com/in/asad-khan-3a08aa217/"}>
            <a className='text-lg md:text-xl' target="_blank"><i className="ri-linkedin-box-fill"></i></a>
          </Link>
        </div>
        <Link href="/About"><a className='text-xs md:text-lg underline'>About this project 📗</a></Link>
      </div>
    </div>
  )
}

export default Footer