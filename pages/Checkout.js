import React, { useContext, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { AppContext } from './_app';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import Head from 'next/head';

const Checkout = () => {

  const { cart, subTotal, userData, setCart, setSubTotal } = useContext(AppContext)
  const [isChecked, setIsChecked] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState("")
  const [day, setDay] = useState("")
  const [weekday, setWeekday] = useState([]);


  const checkOutSchema = yup.object().shape({
    fullName: yup.string().required("Name is required.").min(3).max(30),
    address: yup.string().required(),
    phone: yup.string().min(10, "Phone number can't be less than 10 Digits").max(10, "Phone number can't be greater than 10 Digits").required(),
    pincode: yup.string().min(6, "Pincode is less than 6 digit's").max(6, "Pincode is greater than 6 digit's").required(),
    state: yup.string().min(3, "Can't be less than three letters").max(25, "Can't be greater than twenty-five letters").required(),
    district: yup.string().min(3, "Can't be less than three letters").max(25, "Can't be greater than twenty-five letters").required(),

  })

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      Router.push("http://localhost:3000/Login")
      return;
    }
    else {
      // console.log(cart)
      console.log("")

    }
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(checkOutSchema)
  })

  const isCheckedNeeded = () => toast.error("Please check the check box.");
  const orderPlaced = () => toast.success("Order Placed Successfully. Track on Order Page");


  useEffect(() => {
    const getEstimatedTime = () => {
      let currDate = new Date();

      let estimatedDate = currDate.setDate(currDate.getDate() + 2);
      estimatedDate = new Date(estimatedDate);
      let day = estimatedDate.getDay()
      estimatedDate = `${estimatedDate.getDate()}/${estimatedDate.getMonth() + 1}/${estimatedDate.getFullYear()}`
      setEstimatedTime(estimatedDate);
      setDay(day);
      setWeekday(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);





    }
    getEstimatedTime()


  }, [])

  console.log(estimatedTime)
  const onSubmit = (data) => {
    let email = userData.email;
    let products = [];
    cart.forEach((order) => {
      products.push({ "productId": order.itemId, "quantity": order.itemQty, "price": order.itemPrice, "size": order.itemSize, "color": order.itemColor, "imgPath": order.imgPath, "productName": order.itemName })
    })
    let newData = { ...data, products, "amount": subTotal, userEmail: email, estimatedTime }
    if (isChecked) {
      console.log(data)
      fetch("http://localhost:3000/api/placeOrder", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
      })
      // console.log(`working`)
      setCart([]);
      setSubTotal(0)
      localStorage.removeItem("Cart")
      orderPlaced();
      Router.push("http://localhost:3000/Order");


    }
    else {
      isCheckedNeeded()
    }
  }

  const handleCheck = () => {
    setIsChecked(true);
  }
  return (
    <div className='w-full md:w-8/12 mx-auto transition-all delay-150 ease-in-out'>
      <ToastContainer autoClose={1000} />
      <Head>
        <title>Gearup | Checkout Page</title>
      </Head>
      <h1 className='text-3xl text-center font-semibold text-slate-800 my-4'>Checkout</h1>
      <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mb-4'>
          <label htmlFor="name" className='text-md font-semibold text-slate-800 mb-2'>Full Name </label>
          {errors.fullName?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.fullName.message}`}</span>}
          <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400 bg-white' placeholder='Johan Libert' name='fullName' {...register("fullName")} />
        </div>

        <div className='flex flex-col mb-4'>
          <label htmlFor="address" className='text-md font-semibold text-slate-800 mb-2'>Delivery Address</label>
          {errors.address?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.address.message}`}</span>}
          <input type="text" name='address' className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='Street : 8 Gurugram sector : 08' {...register("address")} />
        </div>
        <div className="flex flex-col mb-4 md:flex-row md:gap-8">
          <div className='flex flex-col mb-4 md:w-1/2'>
            <label htmlFor="phoneNo" className='text-md font-semibold text-slate-800 mb-2'>Phone No.</label>
            {errors.phone?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.phone.message}`}</span>}
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='8578xxx157' name='phone' {...register("phone")} />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label htmlFor="pincode" className='text-md font-semibold text-slate-800 mb-2'>Pincode</label>
            {errors.pincode?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.pincode.message}`}</span>}
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='110038' name='pincode' {...register("pincode")} />
          </div>
        </div>
        <div className="flex flex-col mb-4 md:flex-row md:gap-8">
          <div className='flex flex-col mb-4 md:w-1/2'>
            <label htmlFor="state" className='text-md font-semibold text-slate-800 mb-2'>State</label>
            {errors.state?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.state.message}`}</span>}
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='Haryana' name='state' {...register("state")} />
          </div>
          <div className='flex flex-col mb-4 md:w-1/2'>
            <label htmlFor="district" className='text-md font-semibold text-slate-800 mb-2'>District</label>
            {errors.district?.message && <span className='text-xs mb-2 text-red-500'>{`${errors.district.message}`}</span>}
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='Gurugram' name='district' {...register("district")} />
          </div>
        </div>
        <div className='flex gap-3 items-center my-4 '>
          <input type="checkbox" className='mt-[3px]' name='checkBox' value={isChecked} onChange={handleCheck} />
          <label htmlFor="checkbox" className='text-slate-800'>I hereby check that all the above details are correct.</label>
        </div>
        <div className='bg-green-100'>
          <div className='text-xl font-semibold text-center border-t-2 py-3'>
            <p>Products</p>
          </div>
          <div>
            {cart.map((item, idx) => {
              return (
                <CartItem key={idx} itemNo={idx + 1} itemId={item.itemId} itemName={item.itemName} itemCategory={item.itemCategory} itemColor={item.itemColor} itemPrice={item.itemPrice} itemQty={item.itemQty} itemSize={item.itemSize} />
              )
            })}
          </div>
          <div className='p-4 mt-4'>
            <p className='font-semibold text-xl text-slate-800'>
              Subtotal : ₹{subTotal}
            </p>
          </div>
        </div>
        <div className="my-5 flex flex-col-reverse justify-center md:justify-between md:flex-row-reverse md:items-center">
          <div className=''>
            <p className='flex items-center text-green-700 text-sm mt-4 ml-2 md:m-0'>Estimated Delivery: <span className='ml-1 font-semibold'>{estimatedTime && <p>{estimatedTime} - {weekday[day]}</p>}</span><i className="ri-plane-line text-md ml-2"></i> </p>
          </div>

          <button type="submit" className={`bg-emerald-200 text-xl font-normal px-2 py-1 text-green-900 rounded-sm ${subTotal == 0 ? "pointer-events-none opacity-50" : ""}`}>
            <p>Pay : ₹{subTotal}</p>
          </button>
        </div>
      </form>


    </div>
  )
}


export default Checkout