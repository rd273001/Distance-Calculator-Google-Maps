import React from 'react';

const LoadingIndicator = React.memo( ( { loadingText } ) => {
  return (
    <div className='fixed inset-0 m-auto bg-black/65 flex flex-col flex-grow items-center justify-center'>
      <div className='flex p-3 bg-[conic-gradient(#fff,#ec4899,#581c87,purple)] rounded-full animate-[spin_350ms_linear_infinite] duration-1000'>
        <div
          className='rounded-full p-4 bg-[radial-gradient(#eee,#444)] animate-[spin_300ms_linear_infinite_reverse]'
        >
          <div className='size-4 -m-3.5 rounded-full bg-[radial-gradient(#aaa,#222)]'></div>
        </div>
      </div>
      <p className='mt-1 text-white'>{ loadingText ? loadingText : 'Loading...' }</p>
    </div>
  );
} );

export default LoadingIndicator;