import React from 'react'
import ProductCard from '../components/productCard'
import connectDB from "../Middleware/MongooseConnect"
import Product from "../models/Product";
const Hoodies = ({ products }) => {
  return (
    <div>
      <section className="text-emerald-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center md:justify-start">
            {products.map((product) => {
              return (
                <ProductCard key={product._id} imgUrl={product.imgPath} name={product.productName} slug={product.slug} desc={product.desc} category={product.category} color={product.category} price={product.price} size={product.size} productId={product._id} />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  let Products;
  try {
    console.log(`CONNECTING TO MONGODB!!`)
    await connectDB();
    console.log(`CONNECTED TO DB!!`)
    Products = await Product.find({ category: "HOODIE" })
  } catch (error) {
    res.json({ error: error.message })
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(Products))
    }
  }
}

export default Hoodies