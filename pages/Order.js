import Router from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import OrderWrapper from '../components/OrderWrapper'
import { AppContext } from './_app'
var jwt = require('jsonwebtoken');
const Order = () => {
  const { userData } = useContext(AppContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {

    if (!sessionStorage.getItem("token")) {
      Router.push("http://localhost:3000/Login")
      return;
    }
    else {
      let token = sessionStorage.getItem("token")
      const userDataObj = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY_JWT);

      //POST request with body equal on data in JSON format
      fetch('http://localhost:3000/api/getOrders', {
        method: 'POST',
        "headers"  :{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ "email": userDataObj.email }),
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          setOrders(data)
        })
        //Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });

    }

  }, [])
  return (
    <div>
      {orders.length!==0 && orders.orders.map((order,idx)=>{
        return(
          <OrderWrapper key={idx} order={order}/>
        )
      })}

      {orders.length==0 && <div>No order is placed from this account</div>}

    </div>
  )
}

export default Order