import Router, { useRouter } from 'next/router';
import { useState, createContext, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
export const AppContext = createContext();
var jwt = require('jsonwebtoken');

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [isQtyChange, setIsQtyChange] = useState(false)
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let token;
    if (sessionStorage.getItem("token")) {
      token = sessionStorage.getItem("token")
      const userDataObj = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY_JWT);

      setUserData(userDataObj);
      setIsLogin(true);
    }
    else {
      return
    }
  }, [router.query])

  const handleLogout = () => {
    sessionStorage.clear();
    setTimeout(() => {
      Router.push("http://localhost:3000");
      setIsLogin(false)
    }, 2000);
  }

  useEffect(() => {
    if (localStorage.getItem("Cart")) {
      setCart(JSON.parse(localStorage.getItem("Cart")))
    }
    setIsQtyChange(false)
  }, [])

  useEffect(() => {
    if (localStorage.getItem("Cart")) {
      setCart(JSON.parse(localStorage.getItem("Cart")))
      setSubTotal(JSON.parse(localStorage.getItem("subTotal")));
    }

    setIsQtyChange(false)
  }, [isQtyChange])


  const calSubTotal = (myCart) => {
    let sum = 0;
    if (myCart.length > 0) {
      myCart.forEach((item) => {
        sum += item.itemPrice * item.itemQty;
      })
    }
    setSubTotal(sum);
    saveSubTotal(sum)
  }
  const saveCart = (currCart) => {
    localStorage.setItem("Cart", JSON.stringify(currCart))
  }
  const saveSubTotal = (currSubTotal) => {
    localStorage.setItem("subTotal", JSON.stringify(currSubTotal))

  }
  const addToCart = (itemId, itemName, itemPrice, itemQty, itemColor, itemCategory, itemSize, imgPath) => {
    const newCartItem = {};
    let isPresent = false;
    const newCart = [];
    if (cart.length > 0) {
      cart.forEach(item => {
        if (item.itemId === itemId && item.itemSize === itemSize) {
          increaseQty(itemId)
          isPresent = true
        }
      })
    }
    if (!isPresent) {
      console.log(`first`)
      newCartItem = {
        itemId,
        itemName,
        itemPrice,
        itemQty,
        itemColor,
        itemCategory,
        itemSize,
        imgPath
      };
      newCart = [...cart, newCartItem];
      setCart(newCart);
      saveCart(newCart);
      calSubTotal(newCart);
      isPresent = false;

    }

  }
  const clearCart = () => {
    saveCart([]);
    setCart([]);
    setSubTotal(0)
    saveSubTotal(0)
  }

  const increaseQty = (itemNo) => {
    const newCart = cart;
    newCart.forEach(item => {
      if (item.itemId === itemNo) {
        item.itemQty += 1;
      }
    })
    setCart(newCart);
    saveCart(newCart);
    calSubTotal(newCart)
    setIsQtyChange(true);
  }

  const decreaseQty = (itemNo) => {
    const newCart = cart;
    let updatedList = [];
    let isDeleted = false;
    newCart.forEach(item => {
      if (item.itemId === itemNo) {
        item.itemQty -= 1;
        if (item.itemQty == 0) {
          calSubTotal(newCart)
          updatedList = newCart.filter(d => {
            return d.itemId !== itemNo
          })
          isDeleted = true;
          setCart(updatedList);
          saveCart(updatedList);
          calSubTotal(updatedList)

        }
      }
    })
    if (!isDeleted) {
      setCart(newCart);
      saveCart(newCart);
      calSubTotal(newCart)

    }
    setIsQtyChange(true);
  }
  return <>
    <AppContext.Provider value={{ addToCart, cart, clearCart, increaseQty, decreaseQty, subTotal, isLogin, userData, handleLogout, setIsLogin, setCart, setSubTotal }}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AppContext.Provider>
  </>
}

export default MyApp
