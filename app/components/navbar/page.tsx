'use client'

import React from 'react'
import { useState } from 'react';
import { MdLiveTv } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import ThemeToggle from '../toggle';
import { useTheme } from 'next-themes';
// import { Link } from 'react-router-dom';

function NavPage() {

        const {theme} = useTheme();

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     const query = e.target.elements.search.value;
    //     if (query) {

    //         window.location.href = `/search?query=${query}`;
    //     }
    // }


    const [isClicked, setIsClicked] = React.useState(false);
    const handleClick = () => {
        setIsClicked(!isClicked);
    }
return (
    <div>
            <nav className={`lg:p-10 p-5 ${theme === 'dark' ? 'bg-gray-900 text-white flex items-center bg- justify-between p-2 py-4 lg:p-5 lg:px-20' : 'bg-gray-200 text-black flex items-center bg- justify-between p-2 py-4 lg:p-5 lg:px-20'}`}>
                    <div className='flex  text-red-600 lg:gap-3 gap-1 items-center '>
                            <MdLiveTv className='lg:text-5xl text-3xl font-bold'/>
                            <span className='lg:text-4xl font-semibold text-xl '>MOVIE STREAM</span>
                    </div>

                    

                    <div>
                                    <ul className='hidden lg:flex gap-10'>
                                            <li className='cursor-pointer'>HOME</li>
                                            <li className='cursor-pointer'>GENRE</li>
                                            <li className='cursor-pointer'>COUNTRY</li>
                                          <li className='cursor-pointer'>MOVIES</li>
                                           <li className='cursor-pointer'>TV SERIES</li>
                                            <li className='cursor-pointer'>NEWS & POPULAR</li>
                                    </ul>
                            </div>

                            <div>
                                <ThemeToggle />
                            </div>

                            <div className='hidden lg:flex gap-5'>
                                 <div className='flex items-center'>
                                 <IoIosSearch className='text-2xl relative left-9 text-black '/>
                                 <input  className='bg-white rounded-full text-black px-12 py-2' type="text" placeholder='Enter Keyword' />
                                 </div>

                                    <div className='hidden lg:flex items-center'>
                                            <LuUser className='text-3xl'/>
                                            <span className='cursor-pointer'>Login</span>
                                    </div>
                            </div>

                            {/* Mobile */}

                            <div className='lg:hidden flex items-center text-3xl gap-3'>
                                    {/* <IoIosSearch className='text-xl'/>
                                    <IoNotificationsOutline className='text-xl'/>
                                    <LuUser className='text-xl'/> */}
                            <span onClick={handleClick}>{isClicked ? <AiOutlineClose/> : <CiMenuFries/>}</span>
                            </div>
            </nav>

            <ul className={isClicked ? 'lg:hidden flex flex-col gap-5 bg-black text-white p-5 text-center' : "hidden"}>
                                            <div onClick={() => setIsClicked(false)}><li className='cursor-pointer'>HOME</li></div>
                                            <li className='cursor-pointer' onClick={() => setIsClicked(false)}>GENRE</li>
                                            <li className='cursor-pointer' onClick={() => setIsClicked(false)}>COUNTRY</li>
                                         <div onClick={() => setIsClicked(false)}> <li className='cursor-pointer'>MOVIES</li></div>
                                            <div  onClick={() => setIsClicked(false)}><li className='cursor-pointer'>TV SERIES</li></div>
                                            <div onClick={() => setIsClicked(false)}><li className='cursor-pointer'>NEWS & POPULAR</li></div>
                                    </ul>
    </div>
)
}

export default NavPage