import React, { useState } from 'react'
import Link from 'next/link'
const MobileNav = ({ setIsCart, isCart, setIsSideNav, isSideNav }) => {

  const handleToggleCart = () => {
    setIsCart(!isCart)
  }

  const handleToggleSideNav = ()=>{
    setIsSideNav(!isSideNav)

}
  return (
    <div className='bg-emerald-500/20 rounded-t-md text-black text center flex justify-between  h-16 backdrop-blur-sm px-6'>
      <div className='flex items-center justify-between w-full'>
        <Link href="#" className="text-black">
          <span className="text-2xl  text-black hover:cursor-pointer hover:text-emerald-900  transition-all delay-150 ease-in px-2 py-1 flex item-center " onClick={handleToggleSideNav}><i className="ri-menu-unfold-fill"></i></span>
        </Link>
        <Link href="/" className=" text-black">
          <span className="text-2xl  text-black hover:cursor-pointer hover:text-emerald-900  transition-all delay-150 ease-in px-2 py-1 flex item-center  " ><i className="ri-home-5-fill"></i></span>
        </Link>
        <Link href="#" className="text-black">
          <span className="text-2xl text-black hover:cursor-pointer hover:text-emerald-900  transition-all delay-150 ease-in px-2 py-1 flex item-center " onClick={handleToggleCart} ><i className="ri-shopping-cart-fill"></i></span>
        </Link>
        <Link href="/setting" className=" text-black">
          <span className="text-2xl  text-black hover:cursor-pointer hover:text-emerald-900  transition-all delay-150 ease-in px-2 py-1 flex item-center  " ><i className="ri-user-fill"></i></span>
        </Link>
        
      </div>
    </div>

  )
}

export default MobileNav