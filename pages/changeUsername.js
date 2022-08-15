import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
var jwt = require("jsonwebtoken")
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeUsername = () => {
    const [currentName, setCurrentName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            let token = sessionStorage.getItem("token")
            const userDataObj = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY_JWT);
            setCurrentName(userDataObj.userName);
            setEmail(userDataObj.email);
        }
    }, [])

    const schema = yup.object().shape({
        newUserName: yup.string().required('New Username is required'),
        password: yup.string().required('Your password is required for authentication purposes.')

    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const error = () => toast.error("Wrong Password");
    const good = () => toast.success("User name updated successfully. Login again to see changes.");
    const serverSideError = () => toast.error("Failed to update username. server side error");



    const onSubmit = (data) => {
        console.log(data);
        fetch("http://localhost:3000/api/updateUserInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "newUserName": data.newUserName, "email": email, "password": data.password })
        })
            .then(res => res.json())
            .then(data => {
                if(data.message=="wrong"){
                    error()
                }
                else if(data.message==true){
                    good()
                }
                else{
                    serverSideError()
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='p-2 md:w-8/12 mx-auto h-screen'>
            <ToastContainer autoClose={2000} />

            <div className='text-xl font-Poppins font-bold text-center mb-8 md:text-3xl my-8' >
                <h1 >Update UserName</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-100 p-2 shadow-md">
                <div className="relative mb-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="leading-7 text-sm text-gray-600">Current username</label>
                    </div>
                    <input type="text" id="currentUserName" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder={currentName} disabled />
                </div>
                <div className="relative mb-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="leading-7 text-sm text-gray-600">New username</label>
                        {errors.newUserName?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.newUserName.message}`}</span>}
                    </div>
                    <input type="text" id="newUserName" name="newUserName" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("newUserName")} />
                </div>
                <div className="relative mb-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="leading-7 text-sm text-gray-600">Password</label>
                        {errors.password?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.password.message}`}</span>}
                    </div>
                    <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("password")} />
                </div>
                <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Update</button>
            </form>

        </div>
    )
}

export default ChangeUsername