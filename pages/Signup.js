import React, { useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import Image from 'next/future/image';
import Head from 'next/head'
const Signup = () => {
  const schema = yup.object().shape({
    userName: yup.string().required("Full Name is required"),
    userEmail: yup.string().email("Invalid userEmail !!").required("Email is required"),
    phoneNo: yup.string().min(10, "Phone number can't be less than 10 digits").max(10, "Phone number can't be greater than 10 digits").required("Phone is required"),
    password: yup.string().required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    cPassword: yup.string().oneOf([yup.ref("password"), null]).required("Confirming your password is mandatory")

  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      Router.push("http://localhost:3000/")
      alreadyLogin();
      return;
    }
  }, [])
  const signUpSuccesfull = () => toast.success("Account created Successfully.Redirecting to login... ");
  const signUpFailed = () => toast.error("Email already exist. Please login");
  const otherFailed = () => toast.error("Serve side error 400");
  const alreadyLogin = () => toast.warning("Already Logged In");



  const onSubmit = (data) => {

    //POST request with body equal on data in JSON format
    fetch('http://localhost:3000/api/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        if (data.message == true) {
          signUpSuccesfull();
          setTimeout(() => {
            Router.push("http://localhost:3000/Login")
          }, 2000);
        }
        else if (data.msg == "inuse") {
          signUpFailed()
        }
        else {
          otherFailed()
        }
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div className='w-10/12 mx-auto'>
      <ToastContainer autoClose={1000} />
      <Head>
        <title>Gearup | Sign Up</title>
      </Head>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 flex">
            <div className=' flex justify-end mr-1 relative '>
              <Image src="https://assets.bonkerscorner.com/uploads/2022/02/02144601/Bonkerscorner_billie_eilish_illustration_ost_248-768x1152.jpg" alt="Men-collection" className='w-full ' width={500} height={500} />
              <Image src="/img-holders-top.svg" alt="holders" className='absolute top-0 left-0 w-[20px] lg:w-[30px]' width={500} height={500} />
            </div>
            <div className='relative'>
              <Image src="https://assets.bonkerscorner.com/uploads/2022/06/11151329/Bonkerscorner_No-drugs_ost_6-768x1152.jpg" alt="girls-collection" className='w-full' width={500} height={500} />
              <Image src="/img-holders-bottom.svg" alt="holders" className='absolute bottom-0 right-0 w-[20px] lg:w-[30px]' width={500} height={500} />

            </div>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-4">
                <div className='flex flex-col gap-1'>
                  <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                  {errors.userName?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.userName.message}`}</span>}
                </div>
                <input type="text" id="full-name" name="userName" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("userName")} />
              </div>
              <div className="relative mb-4">
                <div className="flex flex-col gap-1" >
                  <label htmlFor="userEmail" className="leading-7 text-sm text-gray-600">Email</label>
                  {errors.userEmail?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.userEmail.message}`}</span>}
                </div>
                <input type="email" id="userEmail" name="userEmail" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("userEmail")} />
              </div>
              <div className="relative mb-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="phoneNo" className="leading-7 text-sm text-gray-600">Phone No</label>
                  {errors.phoneNo?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.phoneNo.message}`}</span>}
                </div>
                <input type="text" id="phoneNo" name="phoneNo" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("phoneNo")} />
              </div>
              <div className="relative mb-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                  {errors.password?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.password.message}`}</span>}
                </div>
                <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("password")} />
              </div>
              <div className="relative mb-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                  {errors.cPassword?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.cPassword.message}`}</span>}
                </div>

                <input type="password" id="cpassword" name="cPassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("cPassword")} />
              </div>
              <button type="submit" className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Sign Up</button>
              <div className='flex gap-2'>
                <p className='mt-4'>have an account ?</p>
                <Link href="/Login">
                  <p className='mt-[15px] flex items-center font-bold text-slate-700 hover:cursor-pointer'>Login <i className="ri-login-circle-fill text-emerald-500 mt-[1px] ml-1"></i></p>
                </Link>
              </div>
            </form>
          </div>


        </div>
      </section>
    </div>
  )
}

export default Signup