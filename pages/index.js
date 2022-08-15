import Head from 'next/head'
import Image from 'next/future/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gearup.com | An E-commerce site for the stylish and up-to-date peoples</title>
        <meta name="description" content="Gearup.com is an Online E-commerce store made on next.js it is a personal project for learning purposes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto w-8/12 flex flex-col-reverse justify-center md:flex-row md:items-center md:justify-between mb-4 mt-8">
        <div className='p-2'>
          <h1 className='text-2xl font-semibold font-Poppins md:text-3xl md:leading-[50px] lg:text-5xl xl:text-6xl lg:leading-[75px] xl:leading-[85px]'>New Arrivals <br />you&apos;ll simply <br />love<span className='text-emerald-700'>!</span></h1>
          <span className='text-sm text-slate-600'>Starting from Rs.799</span>
          <div className='my-5'>
            <button className='text-sm md:text-md lg:text-xl flex items-center bg-emerald-500 px-2 py-1 rounded-md font-Poppins hover:bg-emerald-600'>Check it Out <i className="ri-arrow-right-line mt-1"></i></button>
          </div>
        </div>

        <div className='object-cover w-full md:w-[40%] p-2 '>
          <Image src="/hero-banner-img.png" alt="New arrivals" className='w-full object-cover' width={500} height={500}/>
        </div>
      </div>
      <div className='mx-auto w-8/12 bg-emerald-100 flex flex-col justify-center items-center md:flex-row md:justify-between '>
        <div className='p-1'>
          <Image src="/SHOP-IMG-1.png" alt="" className='hover:scale-105 transition-all delay-100 ease-in  hover:shadow-2xl hover:cursor-pointer' width={500} height={500}/>
          <p className='font-Poppins  text-3xl md:text-4xl text-center my-4'>SH<span className='text-emerald-600'>O</span>P MEN</p>
        </div>
        <div className='mr-1 mt-3'>
          <Image src="/SHOP-IMG-2.png" alt="" className='w-full hover:scale-105 transition-all delay-100 ease-in md:shadow-2xl hover:shadow-2xl hover:cursor-pointer' width={500} height={500}/>
          <p className='font-Poppins  text-3xl text-center my-4 md:mt-0 md:text-4xl'>SH<span className='text-emerald-600'>O</span>P WOMEN</p>
        </div>
      </div>
      <div className='mx-auto w-8/12 my-6 lg:mt-12'>
        <h1 className='uppercase font-Poppins text-md md:text-xl lg:text-3xl font-[500] text-center mt-2'>Our brand <span className='text-emerald-700'>n</span>ew <span className='underline decoration-emerald-600'>equals</span> collection</h1>
        <p className='text-center text-xs text-slate-500 font-Poppins my-3 lg:text-lg '>Starting from Rs.299</p>
        <div className='grid grid-cols-1 gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-3'>
          <Image src="/equal-1.png" alt="equal" width={500} height={500}/>
          <Image src="/equal-2.png" alt="equal" width={500} height={500}/>
          <Image src="/equal-3.png" alt="equal" width={500} height={500}/>
          <Image src="/equal-4.png" alt="equal" width={500} height={500}/>
          <Image src="/equal-5.png" alt="equal" width={500} height={500}/>
          <Image src="/equal-6.png" alt="equal" width={500} height={500}/>
        </div>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Perks</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">GearUp.com is the best E-commerce website for your clothing needs. Won&apos;t believe it ?? See this</p>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <i className="ri-user-line text-4xl text-emerald-500"></i>
                <h2 className="title-font font-medium text-3xl text-gray-900">250+</h2>
                <p className="leading-relaxed">Customers</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg ">
                <i className="ri-shirt-line text-4xl text-emerald-500"></i>
                <h2 className="title-font font-medium text-3xl text-gray-900 ">200+</h2>
                <p className="leading-relaxed">Products</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <i className="ri-truck-line text-4xl text-emerald-500"></i>
                <h2 className="title-font font-medium text-3xl text-gray-900">100%</h2>
                <p className="leading-relaxed">Return & Refund</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <i className="ri-secure-payment-line text-4xl text-emerald-500"></i>
                <h2 className="title-font font-medium text-3xl text-gray-900">100%</h2>
                <p className="leading-relaxed">Payment security</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
