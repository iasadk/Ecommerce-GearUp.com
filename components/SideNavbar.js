import React from 'react'
import Link from 'next/link'

const SideNavbar = ({setIsSideNav,isSideNav}) => {
    const handleToggleSideNav = ()=>{
        setIsSideNav(!isSideNav)

    }
    return (
        <div className='fixed top-0 left-0 z-10 bg-white w-full h-full'>
            <div className='w-full flex items-end flex-col' >
                <i className="ri-close-line text-4xl mr-4 mt-4 hover:cursor-pointer hover:text-gray-800" onClick={handleToggleSideNav}></i>
            </div>
            <div className='flex flex-col gap-10 mt-6'>
                <Link href="/Tshirts" >
                    <span className="text-2xl text-emerald-900 transition-all delay-150 ease-in px-2 py-1" onClick={handleToggleSideNav} >Tshirts</span>
                </Link>
                <Link href="/Hoodies" >
                    <span className="text-2xl text-emerald-900 transition-all delay-150 ease-in px-2 py-1" onClick={handleToggleSideNav} >Hoodies</span>
                </Link>
                <Link href="/Mugs" >
                    <span className="text-2xl text-emerald-900 transition-all delay-150 ease-in px-2 py-1" onClick={handleToggleSideNav} >Mugs</span>
                </Link>
                <Link href="/Contact" >
                    <span className="text-2xl text-emerald-900 transition-all delay-150 ease-in px-2 py-1" onClick={handleToggleSideNav} >Contact</span>
                </Link>
            </div>
        </div>
    )
}

export default SideNavbar