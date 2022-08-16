import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import OrderWrapper from '../components/OrderWrapper'
var jwt = require('jsonwebtoken');
import Head from 'next/head';
import Loader from '../components/Loader';

const Order = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {

    if (!sessionStorage.getItem("token")) {
      Router.push("http://localhost:3000/Login")
      return;
    }
    else {
      let token = sessionStorage.getItem("token")
      const userDataObj = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY_JWT);
      setIsLoading(true)
      //POST request with body equal on data in JSON format
      fetch('http://localhost:3000/api/getOrders', {
        method: 'POST',
        "headers": {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": userDataObj.email }),
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          // console.log(data)
          setIsLoading(false)
          setOrders(data)
        })
        //Then with the error genereted...
        .catch((error) => {
          setIsLoading(false)
          console.error('Error:', error);
        });

    }

  }, [])
  return (
    <div>
      <Head>
        <title>Gearup | Orders</title>
      </Head>
      {isLoading ? <Loader msg="Fetching Orders"/> : ""}
      {orders?.orders ? orders.orders.map((order, idx) => {
        return (
          <OrderWrapper key={idx} order={order} />
        )
      })
        : <div className='w-full h-screen text-center text-4xl font-Poppins font-semibold flex flex-col items-center justify-center'>No order is placed from this account
          <i className="ri-robot-line text-emerald-200 text-9xl font-thin mt-6"></i>
        </div>
      }


    </div>
  )
}

export default Order