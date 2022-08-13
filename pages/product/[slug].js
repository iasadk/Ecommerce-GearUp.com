import { useRouter } from 'next/router'
import React, { useRef, useState, useContext } from 'react'
import { AppContext } from '../_app'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import connectDB from "../../Middleware/MongooseConnect"
import Product from "../../models/Product"

const Slug = ({ product }) => {
  const router = useRouter();
  const [pinCode, setPinCode] = useState(0);
  const pinCodeRef = useRef(null);
  const wishListRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { addToCart, isLogin} = useContext(AppContext)
  const [selectedOption, setSelectedOption] = useState('S')

  const toggleHeart = () => {
    if (wishListRef.current.classList.contains("text-gray-500")) {
      wishListRef.current.classList.remove("text-gray-500");
      wishListRef.current.classList.add("text-red-500");
    }
    else {
      wishListRef.current.classList.add("text-gray-500");
      wishListRef.current.classList.remove("text-red-500");


    }

  }

  const notify = () => toast.success("Item Added to 🛒");
  const handlePinCode = () => {
    setPinCode(pinCodeRef.current.value);
  }

  const checkPinCode = async () => {
    setIsInvalid(false);
    setIsValid(false)

    if (pinCode.length === 6 && !pinCode.match(/^[A-Za-z]+$/)) {
      //fetching all present pinCodes: 
      const data = await fetch(`http://localhost:3000/api/pinCode`);
      data = await data.json();

      if (data.includes(parseInt(pinCode))) setIsValid(true)
      else {
        alert("Not is out DB")
      }
      pinCodeRef.current.focus();
      pinCodeRef.current.classList.remove("border-red-500")
      pinCodeRef.current.classList.remove("outline-red-500")




      return
    } else {
      pinCodeRef.current.classList.add("border-red-500")
      pinCodeRef.current.classList.add("outline-red-500")
      setIsInvalid(true);
      pinCodeRef.current.value = ""
      pinCodeRef.current.focus();

    }
  }

  const handleSelect = (e)=>{
    setSelectedOption(e.target.value)
  }
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto md:px-36 lg:px-10 object-cover object-top rounded" src={product.imgPath} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.productName}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>

              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10" onChange={(e)=>handleSelect(e)}>
                      {product.size.map((s, i) => {
                        return (
                          <option key={i} value={s}>{s}</option>
                        )
                      })}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}.00</span>
                <button className="flex ml-auto md:ml-4 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded">Buy Now</button>
                <button className={`flex ml-auto md:ml-4 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded ${isLogin ? '' : "pointer-events-none opacity-40"}` } onClick={() => {
                  addToCart(product._id, product.productName, product.price,1, product.color, product.category, selectedOption);
                  notify();
                }}>Add to Cart</button>
                <ToastContainer autoClose={1000} />
                {isLogin && <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:cursor-pointer" ref={wishListRef} onClick={toggleHeart}>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>}
              </div>
              <div className='mt-20'>
                {!isValid && isInvalid && <p className='text-red-500 text-xs '>*Invalid Pincode please check it again.</p>}
                {!isInvalid && isValid && <p className='text-green-500 text-xs '>Product Available</p>}
                <div className='flex gap-3 mt-1'>
                  <input type="text" placeholder='110057' name="pincode" className='h-10  border-2 px-2 rounded focus:outline-gray-400 focus:border-1 focus:border-gray-400 ' onChange={handlePinCode} ref={pinCodeRef} /><br />
                  <button className='md:w-32 text-white text-md bg-green-500 border-0 py-0 px-4 md:px-6 focus:outline-none hover:bg-green-600 rounded' onClick={checkPinCode}>Check</button>
                </div>
                <p className='text-gray-400'>*Area pincode to check avaibility</p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  let product;
  const { slug, id } = context.query;
  let loweredSlug = slug.toLowerCase();
  let modifiedSlug = loweredSlug.replace(/\s/g, '-');

  try {
    console.log(`CONNECTING TO MONGODB!!`)
    await connectDB();
    console.log(`CONNECTED TO DB!!`)
    product = await Product.findById(id)
  } catch (error) {
    console.log(`Error while Connecting!!!`)
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}

export default Slug;