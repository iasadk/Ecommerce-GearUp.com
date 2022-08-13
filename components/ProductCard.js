import React from 'react';
import Link from 'next/link';


const ProductCard = ({ imgUrl, name, slug, desc, category, color, price, size, productId }) => {
    
    return (
        <Link href={`http://localhost:3000/product/${slug}?id=${productId}`}>
            <div className="lg:w-1/4 md:w-1/2 p-4 hover:cursor-pointer hover:bg-emerald-50 transition-colors delay-50 ease-linear ">
                <a className="block relative h-[80vh] md:h[60vh] rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-top w-full h-full block" src={imgUrl} />
                </a>
                <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
                    <p className="mt-1">₹{price}.00</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard