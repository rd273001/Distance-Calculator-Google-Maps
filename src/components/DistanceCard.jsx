import React from 'react';

const DistanceCard = ( { distance, origin, destination } ) => {
  return (
    <div className='rounded-lg overflow-hidden border-1 text-[#1E2A32] border-[#E9EEF2] shadow-md'>
      <div className='px-7 py-4 flex justify-between items-center bg-white'>
        <h2 className='text-xl font-bold mb-2'>Distance</h2>
        <p className='text-3xl font-bold text-[#0079FF]'>{ distance } kms</p>
      </div>
      <div className='px-7 py-4 text-sm bg-[#F4F8FA]'>
        <p>
          The distance between<span className='font-bold'>{ ` ${ origin } ` }</span>and<span className='font-bold'>{ ` ${ destination } ` }</span>via the selected route is<span className='font-bold'>{ ` ${ distance } kms.` }</span>
        </p>
      </div>
    </div>
  );
};

export default DistanceCard;