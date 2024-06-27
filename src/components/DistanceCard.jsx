import React from 'react';

const DistanceCard = ( { distance, origin, destination } ) => {
  return (
    <div className='p-4 rounded-lg border-1 bg-white text-[#1E2A32] border-[#E9EEF2] shadow'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold mb-2'>Distance</h2>
        <p className='text-3xl font-bold text-[#0079FF]'>{ distance } kms</p>
      </div>
      <div className='text-sm mt-1 bg-[#F4F8FA]'>
        The distance between<p className='font-bold'>{ ` ${ origin } ` }</p>and<p className='font-bold'>{ ` ${destination} ` }</p>via the selected route is<p>{ ` ${distance} kms.` }</p>
      </div>
    </div>
  );
};

export default DistanceCard;