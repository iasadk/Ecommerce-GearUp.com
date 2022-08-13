import React, { useContext } from 'react'
import CartItem from './CartItem'
import { AppContext } from '../pages/_app'
import Link from 'next/link'
// Item name size - category - color - price

const CartSideBar = ({ setIsCart, isCart }) => {
    const { cart, clearCart, subTotal, isLogin } = useContext(AppContext)

    const handleToggleCart = () => {
        setIsCart(!isCart)
    }
    return (
        <div className='bg-emerald-700 fixed  right-0 h-[100%] w-full md:w-8/12 lg:w-6/12 xl:w-5/12 z-10 bottom-0 overflow-auto '>
            <div className='w-full flex items-end flex-col' >
                <i className="ri-close-line text-4xl mr-4 mt-4 hover:cursor-pointer hover:text-gray-800" onClick={handleToggleCart}></i>
            </div>
            {cart.length == 0 && <div className=' h-1/2 flex flex-col justify-center items-center'><p className='text-3xl font-bold text-white mb-7'>Your Cart is Empty!!</p><i className="ri-ghost-smile-line text-8xl text-white"></i></div>}

            {
                cart.length > 0 && <div className='ml-4 mt-4 text-xl text-white font-semibold'>
                    <h1>Your Cart items : </h1>
                </div>
            }
            {
                cart.map((item, idx) => {
                    return (
                        <CartItem key={idx} itemNo={idx + 1} itemId={item.itemId} itemName={item.itemName} itemCategory={item.itemCategory} itemColor={item.itemColor} itemPrice={item.itemPrice} itemQty={item.itemQty} itemSize={item.itemSize} />
                    )
                })
            }

            <div className='px-4 py-2 mt-6 text-xl text-black fixed bottom-0 font-semibold bg-emerald-100 w-full ring-1 ring-emerald-200 flex flex-wrap gap-6 md:gap-12'>
                <h4>SubTotal : ₹{subTotal} only</h4>
                <div className='flex flex-wrap gap-2'>
                    <Link href="/Checkout">
                        <button className='flex items-center justify-center bg-emerald-50 px-2 text-sm md:text-lg mt-1 md:mt-0' onClick={handleToggleCart}><i className="ri-check-double-line mt-1 mr-2 text-green-500"></i>Checkout</button>
                    </Link>
                    <button className='flex items-center justify-center bg-emerald-50 px-2 text-sm md:text-lg mt-1 md:mt-0' onClick={clearCart}><i className="ri-close-line mt-1 mr-2 text-red-500"></i>Clear Cart</button>
                </div>
            </div>
        </div >

    )
}

export default CartSideBar