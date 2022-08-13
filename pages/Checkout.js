import React, { useContext,useEffect } from 'react';
import CartItem from '../components/CartItem';
import { AppContext } from './_app';
import Router from 'next/router'
const Checkout = () => {
  const { cart, subTotal} = useContext(AppContext)
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      Router.push("http://localhost:3000/Login")
      return;
    }
  }, [])
  return (
    <div className='w-full md:w-8/12 mx-auto transition-all delay-150 ease-in-out'>
      <h1 className='text-3xl text-center font-semibold text-slate-800 my-4'>Checkout</h1>
      <form className='p-4'>
        <div className='flex flex-col mb-4'>
          <label htmlFor="name" className='text-md font-semibold text-slate-800 mb-2'>Full Name </label>
          <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400 bg-white' placeholder='Johan Libert' />
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor="email" className='text-md font-semibold text-slate-800 mb-2'>Email</label>
          <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400 bg-white' placeholder='Johan@6969gmail.com' />
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor="address" className='text-md font-semibold text-slate-800 mb-2'>Delivery Address</label>
          <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='Street : 8 Gurugram sector : 08' />
        </div>
        <div className="flex flex-col mb-4 md:flex-row md:gap-8">
          <div className='flex flex-col mb-4 md:w-1/2'>
            <label htmlFor="address" className='text-md font-semibold text-slate-800 mb-2'>Phone No.</label>
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='8578xxx157' />
          </div>
          <div className='flex flex-col md:w-1/2'>
            <label htmlFor="address" className='text-md font-semibold text-slate-800 mb-2'>Pincode</label>
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='110038' />
          </div>
        </div>
        <div className="flex flex-col mb-4 md:flex-row md:gap-8">
          <div className='flex flex-col mb-4 md:w-1/2'>
            <label htmlFor="address" className='text-md font-semibold text-slate-800 mb-2'>State</label>
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='Haryana' />
          </div>
          <div className='flex flex-col mb-4 md:w-1/2'>
            <label htmlFor="address" className='text-md font-semibold text-slate-800 mb-2'>District</label>
            <input type="text" className='border-b-2 border-gray-300 text-lg focus:outline-none focus:border-emerald-400  bg-white' placeholder='Gurugram' />
          </div>
        </div>
        <div className='flex gap-3 items-center my-4 '>
          <input type="checkbox" className='mt-[3px]' />
          <label htmlFor="checkbox" className='text-slate-800'>I hereby check that all the above details are correct.</label>
        </div>
        <div className='bg-green-100'>
          <div className='text-xl font-semibold text-center border-t-2 py-3'>
            <p>Products</p>
          </div>
          <div>
            {cart.map((item, idx) => {
              return (
                <CartItem key={idx} itemNo={idx + 1} itemId={item.itemId} itemName={item.itemName} itemCategory={item.itemCategory} itemColor={item.itemColor} itemPrice={item.itemPrice} itemQty={item.itemQty} />
              )
            })}
          </div>
          <div className='p-4 mt-4'>
            <p className='font-semibold text-xl text-slate-800'>
              Subtotal : ₹{subTotal}
            </p>
          </div>
        </div>
        <div className="my-5">
          <button className='bg-emerald-200 text-xl font-normal px-2 py-1 text-green-900 rounded-sm'>
            <p>Pay : ₹{subTotal}</p>
          </button>
        </div>
      </form>


    </div>
  )
}

export default Checkout