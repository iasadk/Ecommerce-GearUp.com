import React from 'react'
import Head from 'next/head';
const About = () => {
  return (
    <div className='font-Poppins'>
      <Head>
        <title>Gearup | About this project</title>
      </Head>
      <div className='text-3xl md:text-4xl  font-semibold text-emerald-400 mt-8'>
        <h1 className='w-8/12 mx-auto text-center'>About Page</h1>
      </div>
      <div className='font-Poppins text-md p-4 w-full md:w-8/12 mx-auto'>
        <p>
          Gearup.com is an E-commerce site which is made using latest and trending technologies in the field of  <b className=" text-emerald-600" >Web Development</b>.  <br />
          Following are the tools which are used in the developmet of this amazing website :
        </p>
        <ul className='list-disc px-5'>
          <li>React js </li>
          <li>Next js </li>
          <li>Tailwind CSS </li>
          <li>TailBlocks</li>
          <li>Node js </li>
          <li>MongoDB </li>
          <li>Mongoose </li>
          <li>Nodemailer </li>
          <li>And some other third party packages</li>
        </ul>
        <p>
          This is really an amazing project in terms of both  <b className=" text-emerald-600" >learning</b> and  <b className=" text-emerald-600" >researching</b> because making such big site with good designing and proper functionality is new for me. 
          Even though I had made serveral big projects before but this one is best so far cause this project uses the latest tech stack.
        </p>
        <h2 className='text-lg font-semibold underline my-4'>
          Is there improvement needed ?? 
        </h2>
          <p>
            If you familiar with programming then you know that there always a need and way of improving and optimising things. So sure this website still needs so much work like Payment gateway, better database structure, More security and last but not least your people guidance and tips.  
          </p>
      </div>
      <div className='my-4 p-4 md:w-8/12 mx-auto'>
          <h2 className='font-semibold text-xl mb-4'>😉 About the developer !!</h2>
          <div>
            <p>Hola, people first of all thanks for visiting this site I hope you like it.
            
            So Mohammad Asad Khan this side an ethusiast programmer who love to  <b className=" text-emerald-600" >learn</b> and  <b className=" text-emerald-600" >explore</b> new tech stuff.  <br />

            I have completed  <b className=" text-emerald-600" ><i>Gearup.com</i></b> on  <b className=" text-emerald-600" >16, Aug 2022</b> during my holidays after first year finals 🤞. I hope when I look back at this special project I get the proud feeling because there was a time when I was strugglng to make a simple counter app in React and now I&lsquo;m   here. Alhamdulliah!!!.  <br />
             <br />
            So ya guys that it for this project and once again  <b className=" text-emerald-600" >THANK YOU!!!</b> <br />
            ❤ Good night !!
            </p>
          </div>
      </div>
    </div>
  )
}

export default About