import React from 'react';

const LoadingIndicator = React.memo( ( { loadingText } ) => {
  return (
    <>
      <div className='flex p-3 bg-[conic-gradient(#fff,#ec4899,#581c87,purple)] rounded-full animate-[spin_350ms_linear_infinite] duration-1000'>
        <div
          className='rounded-full p-4 bg-[radial-gradient(#eee,#444)] animate-[spin_300ms_linear_infinite_reverse]'
        >
          <div className='size-4 -m-3.5 rounded-full bg-[radial-gradient(#aaa,#222)]'></div>
        </div>
      </div>
      <p className='mt-1 font-medium'>{ loadingText }</p>
    </>
  );
} );

export default LoadingIndicator;