import React, {useContext} from 'react'
import { AppContext } from '../pages/_app'

const CartItem = ({ itemNo, itemId,itemName, itemCategory, itemColor, itemPrice, itemQty, itemSize }) => {
    const {increaseQty, decreaseQty} = useContext(AppContext);
    return (
        <div className='ml-4 mt-4'>
            <div className='flex flex-wrap items-center flex-row '>
                <p className='text-md md:text-lg mt-3'>{`${itemNo}. ${itemName} (${itemSize}) - ${itemCategory} (${itemColor}) : ₹${itemPrice} `}</p>
                <div className='mt-3 ml-6 flex gap-2'>
                    <button className='bg-emerald-200 px-2 hover:bg-emerald-300' onClick={()=>increaseQty(itemId)}><i className="ri-add-line"></i></button>
                    <p className='bg-white px-3'>{itemQty}</p>
                    <button className='bg-emerald-200 px-2 hover:bg-emerald-300' onClick={()=>{decreaseQty(itemId)}}><i className="ri-subtract-line"></i></button>
                </div>
            </div>
        </div>
    )
}

export default CartItem