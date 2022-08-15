import React from 'react'
import Image from 'next/future/image'
const Loader = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <Image src="/loader.svg" width={100} height={100} alt="loader"/>
        <div className='mt-6'>
          <p className='font-poppins font-thin text-xl'>Preparing email.....</p>
        </div>
    </div>
  )
}

export default Loader