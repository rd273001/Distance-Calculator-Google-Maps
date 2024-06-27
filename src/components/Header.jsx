import React from 'react';
import logo from '../assets/graviti-logo.png';

const Header = () => {
  return (
    <div className='flex items-center bg-[#ffffff] py-2 sm:px-14 px-4'>
      <a href='#'>
        <img src={ logo } alt='Graviti-logo' className='md:h-14 sm:h-12 h-10' />
      </a>
    </div>
  );
};

export default Header;