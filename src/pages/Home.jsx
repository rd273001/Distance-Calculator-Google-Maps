import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '40%',
  height: '400px'
};
const center = {
  lat: 20.5937,
  lng: 78.9629
};

const Home = () => {
  const { isLoaded } = useJsApiLoader( {
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  } );

  return (
    <div className='flex min-h-screen justify-center items-center bg-gray-300'>
      { isLoaded ? <GoogleMap
        mapContainerStyle={ containerStyle }
        center={ center }
        zoom={ 10 }
      >
        <></>
      </GoogleMap>
        : <p>Google Maps Loading...</p>
      }
    </div>
  );
};

export default Home;