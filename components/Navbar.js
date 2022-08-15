import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import CartSideBar from './CartSideBar'
import MobileNav from './MobileNav'
import React, { useState, useContext } from 'react'
import SideNavbar from './SideNavbar';
import { Dropdown, Tooltip } from 'flowbite-react'
import { AppContext } from '../pages/_app'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
    const [isCart, setIsCart] = useState(false);
    const [isSideNav, setIsSideNav] = useState(false);
    const { isLogin, handleLogout, userData } = useContext(AppContext)

    const handleToggleCart = () => {
        setIsCart(!isCart)
        console.log(isLogin)
    }

    const notify = () => toast.success("Logout Successfully 🤞");

    return (
        <div className='w-full h-16 bg-emerald-50 flex justify-between md:px-28 shadow-md sticky top-0 z-10 '>
            <ToastContainer autoClose={1000} />

            <div className="flex flex-col justify-center items-center text-2xl text-emerald-600 w-full md:w-1/3 ">
                <Link href="/"><span className='flex justify-center item-center hover:cursor-pointer'>GearUp.com<i className="ri-anchor-line ml-2"></i></span></Link>
            </div>
            <div className="w-6/12  hidden md:block xl:w-8/12 lg:w-8/12">
                <div className='flex flex-row justify-between h-full items-center'>
                    <Link href="/Tshirts">
                        <span className="text-sm lg:text-xl text-emerald-900 hover:cursor-pointer hover:text-emerald-700  transition-all delay-150 ease-in px-2 py-1" >Tshirts</span>
                    </Link>
                    <Link href="/Hoodies" className="text-xl text-emerald-900">
                        <span className="text-sm lg:text-xl  text-emerald-900 hover:cursor-pointer hover:text-emerald-700  transition-all delay-150 ease-in px-2 py-1" >Hoodies</span>
                    </Link>
                    <Link href="/Mugs" className="text-xl  text-emerald-900">
                        <span className="text-sm lg:text-xl  text-emerald-900 hover:cursor-pointer hover:text-emerald-700  transition-all delay-150 ease-in px-2 py-1" >Mugs</span>
                    </Link>
                    <Link href="/Contact" className="text-xl  text-emerald-900">
                        <span className="text-sm lg:text-xl  text-emerald-900 hover:cursor-pointer hover:text-emerald-700  transition-all delay-150 ease-in px-2 py-1" >Contact</span>
                    </Link>
                    {isLogin ? <Dropdown label={<i className="ri-user-line"></i>} className="text-sm lg:text-xl ring-1 ring-emerald-400 text-emerald-900 font-bold hover:cursor-pointer hover:text-emerald-100  transition-all delay-150 ease-in  flex item-center  bg-emerald-300 rounded hover:bg-emerald-400 mr-2" >
                        <Tooltip
                            content={userData.userName}
                            placement='bottom'
                        />
                        <Dropdown.Header >
                            <span className="block text-sm">
                                signed in email
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {userData.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            <Link href="/Order">
                                Orders
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href="/Setting">
                                Settings
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => {
                            handleLogout();
                            notify();
                        }}>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown> : <Link href="/Login" className="text-xl text-emerald-900">
                        <span className="text-sm ring-1 ring-emerald-400 lg:text-xl  text-emerald-900 hover:cursor-pointer hover:text-emerald-100  transition-all delay-150 ease-in bg-emerald-300 px-2 py-1 rounded hover:bg-emerald-400" >Login</span>
                    </Link>}
                    <Link href="#" className="text-xl  text-emerald-900">
                        <span className={`text-sm lg:text-xl ring-1 ring-emerald-400 text-emerald-900 hover:cursor-pointer hover:text-emerald-100  transition-all delay-150 ease-in px-2 py-1 flex item-center  bg-emerald-300 rounded hover:bg-emerald-400 ${isLogin ? '' : "pointer-events-none opacity-40"}`} onClick={handleToggleCart}>Cart<i className="ri-shopping-cart-line ml-2"></i></span>
                    </Link>
                </div>
            </div>
            <div className='block fixed z-10 bottom-0 sm:block md:hidden w-screen h-16 '>
                <MobileNav setIsCart={setIsCart} isCart={isCart} setIsSideNav={setIsSideNav} isSideNav={isSideNav} />
            </div>
            {isCart && isLogin && <CartSideBar setIsCart={setIsCart} isCart={isCart} />}
            {isSideNav && <SideNavbar setIsSideNav={setIsSideNav} isSideNav={isSideNav} />}

            <div id="dropdownInformation" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    <div>Bonnie Green</div>
                    <div className="font-medium truncate">name@flowbite.com</div>
                </div>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                </ul>
                <div className="py-1">
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </div>
            </div>
        </div>

    )
}

export default Navbar