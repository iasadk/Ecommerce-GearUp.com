import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import Loader from '../components/Loader';
import Head from 'next/head';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const schema = yup.object().shape({
        email: yup.string().email().required("Registed Email is required!!")

    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const error = () => toast.error("No such email exist!!");
    const mailServiceError = () => toast.error("Problem in mail service. Try after sometime.");
    const good = () => toast.success("Email sent to registed account. Check your email");
    const serverSideError = () => toast.error("Failed to update username. server side error");



    const onSubmit = (data) => {
        setIsLoading(true)
        fetch("http://localhost:3000/api/forgotPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Wrong email") {
                    setIsLoading(false)

                    error()
                }
                else if (data.message == true) {
                    setIsLoading(false)
                    good()
                }
                else if (data.message === "Problem in mail service") {
                    mailServiceError()
                    setIsLoading(false)

                }
                else {
                    serverSideError()
                    console.log(data)
                    setIsLoading(false)

                }
            }).catch(err => {
                console.log(err)
                setIsLoading(false)

            })
    }
    return (
        <div className='p-2 md:w-8/12 mx-auto h-screen'>
            <ToastContainer autoClose={2000} />
            <Head>
                <title>Gearup | Forgot Password</title>
            </Head>
            {isLoading ? <Loader msg="Preparing Email...."/> :
                <div>
                    <div className='text-xl font-Poppins font-bold text-center mb-8 md:text-3xl my-8' >
                        <h1 >Forgot Password</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-100 p-2 shadow-md">
                        <div className="relative mb-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="username" className="leading-7 text-sm text-gray-600">Registerd email</label>
                                {errors.email?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.email.message}`}</span>}
                            </div>
                            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("email")} />
                        </div>

                        <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Send email</button>
                    </form>
                </div>}
        </div>
    )
}

export default ForgotPassword