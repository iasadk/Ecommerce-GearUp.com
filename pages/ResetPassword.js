import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router, { useRouter } from 'next/router';
var jwt = require("jsonwebtoken")
import Link from 'next/link'

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [isExpired, setIsexpired] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        const { token } = router.query;
        try {
            const userDataObj = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY_JWT);
            setIsexpired(false)
            setEmail(userDataObj.email)
        } catch (error) {
            console.log(error.message)
            setIsexpired(true);
        }

    }, [router.isReady])

    const schema = yup.object().shape({
        newPassword: yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ).required('Your password is required for authentication purposes.'),
        cPassword: yup.string().oneOf([yup.ref("newPassword"), null]).required("Confirming your password is mandatory")

    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const error = () => toast.error("Wrong Password");
    const good = () => toast.success("Password updated successfully. Redirecting to Login page..");
    const serverSideError = () => toast.error("Failed to update password. server side error");



    const onSubmit = (data) => {
        console.log(data)
        fetch("http://localhost:3000/api/resetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "email": email, "newPassword": data.newPassword })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == true) {
                    good()
                    setTimeout(()=>{
                        Router.push("http://localhost:3000/Login")
                    },1000)
                }
                else {
                    serverSideError()
                    console.log(data)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='p-2 md:w-8/12 mx-auto h-screen'>
            <ToastContainer autoClose={1000} />

            {isExpired ?
                <div className="h-screen flex justify-center items-center flex-col">
                    <p className='text-5xl font-Poppins font-semibold text-emerald-500'>Request Expired.</p>
                    <div className='my-4'>
                        <Link href="/ForgotPassword"><a className='underline decoration-emerald-800'>Click here apply for new request</a></Link>
                    </div>
                </div> :
                <div>
                    <div className='text-xl font-Poppins font-bold text-center mb-8 md:text-3xl my-8' >
                        <h1 >Reset Pasword</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-100 p-2 shadow-md">
                        <div className="relative mb-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="username" className="leading-7 text-sm text-gray-600">New Password</label>
                                {errors.newPassword?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.newPassword.message}`}</span>}
                            </div>
                            <input type="password" id="newPassword" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("newPassword")} />
                        </div>
                        <div className="relative mb-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                {errors.cPassword?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.cPassword.message}`}</span>}
                            </div>

                            <input type="password" id="cpassword" name="cPassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("cPassword")} />
                        </div>
                        <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Reset</button>
                    </form>

                </div>}
        </div>
    )
}


export default ResetPassword