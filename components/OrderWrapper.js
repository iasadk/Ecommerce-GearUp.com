import React, { useEffect, useState } from 'react'

const OrderWrapper = ({ order }) => {


    return (
        <div className='bg-slate-100 p-4 my-12 w-full md:w-8/12 transition-all delay-100 ease-in-out mx-auto'>
            <div>
                <div className=' mt-5 text-lg md:text-2xl font-semibold text-gray-400 flex justify-between'>
                    <p>Order ID : {order._id}</p>
                    <button className='flex gap-1 text-sm bg-emerald-300 text-black items-center px-2 rounded-md hover:bg-emerald-400'>
                        <i className="ri-map-pin-line"></i> <p>Track</p>
                    </button>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-sm mt-4">
                    <div className='flex gap-1 mb-2'>
                        <p>Order date:</p><span className='font-semibold text-md'>{order.createdAt.split("T")[0]}</span>
                    </div>
                    <div className=''>
                        <p className='flex items-center text-green-500'>Estimated Delivery: <span className='ml-1 font-semibold'>{order.estimatedTime}</span><i className="ri-plane-line text-md ml-2"></i> </p>
                    </div>
                </div>

                <div className='my-12'>
                    {order.products.map((product, idx) => {
                        return (
                            <div key={idx} className='flex justify-between bg-slate-200 rounded my-4'>
                                <div className='flex gap-2 my-4 '>
                                    <img src={product.imgPath} alt="Tshirt black" className='w-1/4 md:w-1/6' />
                                    <div className='text-slate-500 flex flex-col gap-3 md:justify-end'>
                                        <p className='text-lg font-normal '>{product.productName}</p>
                                        <div className='flex gap-2 text-xs font-thin'>
                                            <p>{product.color}</p>
                                            <p>{product.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col text-md w-[230px] justify-start md:justify-end items-start  my-4'>
                                    <p className='md:text-lg font-bold'>₹ {product.price}</p>
                                    <div className='text-sm mt-2'>
                                        <p className='text-slate-500 font-thin'>Qty : {product.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className='grid grid-cols-2 row-auto gap-y-3'>
                    <div className='payment'>
                        <h1 className='text-slate-600 flex items-center gap-1 font-semibold lg:text-lg'>Payment <i className="ri-currency-line"></i></h1>
                        <div className='mt-2'>
                            <p className='text-md font-thin lg:text-base'>**56 <i className="ri-visa-line text-lg"></i></p>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-slate-600 flex items-center gap-1 font-semibold lg:text-lg'>Delivery <i className="ri-truck-line mt-1"></i></h1>
                        <div>
                            <p className='text-xs text-slate-500 font-thin my-2 lg:text-base'>Address</p>
                            <p className='text-sm text-slate-500 font-normal my-2 lg:text-lg'>
                                {order.address}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-slate-600 flex items-center gap-1 font-semibold lg:text-lg'>Need help <i className="ri-question-line"></i></h1>
                        <div>
                            <p className='text-xs text-slate-500 font-thin my-2 flex items-center gap-1 xl:text-base'><i className="ri-questionnaire-fill"></i> Order Issue <i className="ri-arrow-right-up-line"></i></p>
                            <p className='text-xs text-slate-500 font-thin my-2 flex items-center gap-1 xl:text-base'>
                                <i className="ri-truck-line "></i> Delivery Info <i className="ri-arrow-right-up-line"></i>
                            </p>
                            <p className='text-xs text-slate-500 font-thin my-2 flex items-center gap-1 xl:text-base'>
                                <i className="ri-arrow-go-back-line"></i> Returns <i className="ri-arrow-right-up-line"></i>
                            </p>
                        </div>


                    </div>

                    <div>
                        <h1 className='text-slate-600 mt-1 flex items-center gap-1 border-t-2 border-slate-300 font-semibold lg:text-lg'>Order Summary</h1>
                        {order.products.map((product, idx) => {
                            return (
                                <div key={idx} className='flex justify-between items-center '>
                                    <p className='text-sm text-slate-500 font-thin my-2 lg:text-base'>{product.productName}</p>
                                    <p>{`${product.quantity} X ₹${product.price}`}</p>
                                </div>
                            )
                        })}
                        <div className='flex justify-between items-center border-t-2 border-slate-300'>
                            <p className='text-sm text-slate-500 font-thin my-2 lg:text-base'>Total</p>
                            <p>₹{order.amount}</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}



export default OrderWrapper