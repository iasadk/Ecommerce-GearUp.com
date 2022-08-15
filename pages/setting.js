import React from 'react'
import Link from 'next/link'
const setting = () => {
    return (
        <div className="w-full font-Poppins h-screen">
            <div className='my-4'>
                <h1 className='text-xl text-center font-bold'>Hello, Asad Khan</h1>
            </div>
            <div className='w-full md:w-9/12 mx-auto flex flex-col gap-y-4 p-2 md:grid md:grid-cols-3  md:gap-x-4'>
                <Link href="/changeUsername">
                    <div className="text-xl bg-emerald-50 rounded-lg ring-1 ring-emerald-400 group ">
                        <p class="group-hover:bg-emerald-100 group-hover:cursor-pointer group-hover:text-green-600 px-1 py-2 "><i class="ri-user-settings-line"></i> Change username</p>
                    </div>
                </Link>
                <Link href="/changePassword">
                    <div className="text-xl bg-emerald-50 rounded-lg ring-1 ring-emerald-400 group">
                        <p class="group-hover:bg-emerald-100 group-hover:cursor-pointer group-hover:text-green-600 px-1 py-2"><i class="ri-key-fill"></i> Change password</p>
                    </div>
                </Link>
                <div className="text-xl bg-emerald-50 rounded-lg ring-1 ring-emerald-400 group">
                        <p class="group-hover:bg-emerald-100 group-hover:cursor-pointer group-hover:text-green-600 px-1 py-2 flex items-centers gap-1"><i class="ri-heart-fill mt-[.5px]"></i>Wishlist</p>
                    </div>
            </div>
        </div>
    )
}

export default setting