import React from 'react';

const DistanceCard = ( { distance, origin, destination } ) => {
  return (
    <div className='mt-6 bg-white p-4 rounded-md shadow'>
      <h2 className='text-xl font-bold mb-2'>Distance</h2>
      <p className='text-3xl font-bold text-[#0079FF]'>{ distance } kms</p>
      <p className='text-sm text-gray-600 mt-1'>
        The distance between { origin } and { destination } via the selected route is { distance } kms.
      </p>
    </div>
  );
};

export default DistanceCard;