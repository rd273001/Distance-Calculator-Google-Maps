import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className='flex items-center bg-[#ffffff] py-2 sm:px-14 px-4 drop-shadow-md'>
      <a href='#' className='flex items-center'>
        <img src={ logo } alt='app-logo' className='h-7 mr-1' />
        <p className='font-bold text-2xl'>Distance Calculator</p>
      </a>
    </div>
  );
};

export default Header;