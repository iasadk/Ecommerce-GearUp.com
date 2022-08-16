import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import { AppContext } from './_app';
import Image from 'next/future/image'
import Head from 'next/head';
import Loader from '../components/Loader';
var jwt = require("jsonwebtoken")
const Login = () => {
  const [isLoading, setIsLoading] = useState(false)


  const schema = yup.object().shape({
    userEmail: yup.string().email("Invalid userEmail !!").required("Email is required"),
    password: yup.string().required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )

  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const LoginSuccesfull = () => toast.success("Login Successfully ");
  const LoginFailed = () => toast.error("Invalid Credentials");
  const emailFailed = () => toast.error("Email Not exist. Please Sign Up");
  const alreadyLogin = () => toast.warning("Sorry, but already Logged in");
  const falseToken = () => toast.error("Malicious Activity : Fake Token detected")



  const { setIsLogin } = useContext(AppContext)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      try {
        jwt.verify(sessionStorage.getItem("token"), process.env.NEXT_PUBLIC_SECRET_KEY_JWT)
        alreadyLogin();

      } catch (error) {
        falseToken();
      }
      Router.push("http://localhost:3000/")
      return;
    }
  }, [])
  const onSubmit = (data) => {
    // console.log(data)
    setIsLoading(true);
    //POST request with body equal on data in JSON format
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        // console.log(data)
        setIsLoading(false);

        if (data.message == true) {
          sessionStorage.setItem("token", data.token);
          LoginSuccesfull();
          setIsLogin(true);
          setTimeout(() => {
            Router.push("http://localhost:3000/")
          }, 2000);
        }
        else if (data.message == "Invalid Credentials") {
          LoginFailed()
        }
        else if (data.message == "Email Not exist. Please Sign Up") {
          emailFailed()
        }

      })
      //Then with the error genereted...
      .catch((error) => {
        setIsLoading(false);

        console.error('Error:', error);
      });
  }

  return (
    <div className='w-10/12 mx-auto'>
      <ToastContainer autoClose={1000} />
      <Head>
        <title>Gearup | Login</title>
      </Head>
      {isLoading && <Loader msg="Loading...." />}
      {!isLoading && <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 flex">
            <div className=' flex justify-end mr-1 relative '>
              <Image src="https://assets.bonkerscorner.com/uploads/2022/08/30103929/Black-Ruffle-It-Up-Oversized-T-shirt_1-768x1152.jpg" alt="Men-collection" className='w-full ' width={500} height={500} />
              <Image src="/img-holders-top.svg" alt="holders" className='absolute top-0 left-0 w-[20px] lg:w-[30px]' width={500} height={500} />
            </div>
            <div className='relative'>
              <Image src="https://assets.bonkerscorner.com/uploads/2022/05/27170951/20220527_093951522_iOS-768x1152.jpg" alt="girls-collection" className='w-full' width={500} height={500} />
              <Image src="/img-holders-bottom.svg" alt="holders" className='absolute bottom-0 right-0 w-[20px] lg:w-[30px]' width={500} height={500} />

            </div>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login to your account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-4">
                <div className="flex flex-col gap-1" >
                  <label htmlFor="userEmail" className="leading-7 text-sm text-gray-600">Email</label>
                  {errors.userEmail?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.userEmail.message}`}</span>}
                </div>
                <input type="email" id="userEmail" name="userEmail" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("userEmail")} />
              </div>
              <div className="relative mb-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                  {errors.password?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.password.message}`}</span>}
                </div>
                <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("password")} />
              </div>
              <div className="flex justify-between items-center flex-wrap" >
                <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Login</button>
                <Link href="/ForgotPassword">
                  <a className='hover:text-slate-900'>forgot password ?? </a>
                </Link>
              </div>
              <div className='flex gap-2 flex-wrap items-center'>
                <p className='mt-4'>Not have an account ?</p>
                <Link href="/Signup">
                  <p className='mt-[15px] flex items-center font-bold text-slate-700 hover:cursor-pointer '>Sign up <i className="ri-login-circle-fill text-emerald-500 mt-[1px] ml-1"></i></p>
                </Link>
              </div>
            </form>

          </div>

        </div>
      </section>}
    </div>
  )
}

export default Login