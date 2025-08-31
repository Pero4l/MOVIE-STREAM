'use client'

import React, { useState } from 'react';
import { MdLiveTv } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import ThemeToggle from '../toggle';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function NavPage() {
  const { theme } = useTheme();
  const [isClicked, setIsClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <nav className={`lg:p-10 p-5 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'} flex items-center justify-between py-4 lg:px-20`}>
        {/* Logo */}
        <div className='flex text-red-600 lg:gap-3 gap-1 items-center'>
          <MdLiveTv className='lg:text-5xl text-3xl font-bold' />
          <span className='lg:text-4xl font-semibold text-xl'>MOVIE STREAM</span>
        </div>

        {/* Nav Links */}
        <div>
          <ul className='hidden lg:flex gap-10'>
            <Link href='/'><li className='cursor-pointer'>HOME</li></Link>
            <li className='cursor-pointer'>GENRE</li>
            <li className='cursor-pointer'>COUNTRY</li>
            <Link href='/movies'><li className='cursor-pointer'>MOVIES</li></Link>
            <Link href='/series'><li className='cursor-pointer'>TV SERIES</li></Link>
            <Link href='/popular'><li className='cursor-pointer'>POPULAR</li></Link>
          </ul>
        </div>

        {/* Theme Toggle */}
        <div>
          <ThemeToggle />
        </div>

        {/* Search + User */}
        <div className='hidden lg:flex gap-5 items-center'>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className='flex items-center'>
            <IoIosSearch className='text-2xl relative left-9 text-black' />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Enter Keyword'
              className='bg-white rounded-full text-black px-12 py-2'
            />
          </form>

          {/* User/Login */}
          <div className='hidden lg:flex items-center'>
            <LuUser className='text-3xl' />
            <span className='cursor-pointer'>Login</span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className='lg:hidden flex items-center text-3xl gap-3'>
          <span onClick={handleClick}>
            {isClicked ? <AiOutlineClose /> : <CiMenuFries />}
          </span>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <ul className={isClicked ? 'lg:hidden flex flex-col gap-5 bg-black text-white p-5 text-center' : "hidden"}>
        <div onClick={() => setIsClicked(false)}><li className='cursor-pointer'>HOME</li></div>
        <li className='cursor-pointer' onClick={() => setIsClicked(false)}>GENRE</li>
        <li className='cursor-pointer' onClick={() => setIsClicked(false)}>COUNTRY</li>
        <div onClick={() => setIsClicked(false)}><li className='cursor-pointer'>MOVIES</li></div>
        <div onClick={() => setIsClicked(false)}><li className='cursor-pointer'>TV SERIES</li></div>
        <div onClick={() => setIsClicked(false)}><li className='cursor-pointer'>NEWS & POPULAR</li></div>
      </ul>
    </div>
  );
}

export default NavPage;
