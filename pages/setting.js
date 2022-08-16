import React, { useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const Setting = () => {
    const needToLogin = () => toast.warning("Please login to get access");

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            Router.push("http://localhost:3000/Login")
            needToLogin()
            return;
        }
    }, [])
    return (
        <div className="w-full font-Poppins h-screen">
            <ToastContainer autoClose={1000} />
            <Head>
                <title>Gearup | Setting</title>
            </Head>
            <div className='my-4'>
                <h1 className='text-xl text-center font-bold'>Hello, Asad Khan</h1>
            </div>
            <div className='w-full md:w-9/12 mx-auto flex flex-col gap-y-4 p-2 md:grid md:grid-cols-3  md:gap-x-4'>
                <Link href="/ChangeUsername">
                    <div className="text-xl bg-emerald-50 rounded-lg ring-1 ring-emerald-400 group ">
                        <p className="group-hover:bg-emerald-100 group-hover:cursor-pointer group-hover:text-green-600 px-1 py-2 "><i className="ri-user-settings-line"></i> Change username</p>
                    </div>
                </Link>
                <Link href="/ChangePassword">
                    <div className="text-xl bg-emerald-50 rounded-lg ring-1 ring-emerald-400 group">
                        <p className="group-hover:bg-emerald-100 group-hover:cursor-pointer group-hover:text-green-600 px-1 py-2"><i className="ri-key-fill"></i> Change password</p>
                    </div>
                </Link>
                <div className="text-xl bg-emerald-50 rounded-lg ring-1 ring-emerald-400 group">
                    <p className="group-hover:bg-emerald-100 group-hover:cursor-pointer group-hover:text-green-600 px-1 py-2 flex items-centers gap-1"><i className="ri-heart-fill mt-[.5px]"></i>Wishlist</p>
                </div>
            </div>
        </div>
    )
}

export default Setting