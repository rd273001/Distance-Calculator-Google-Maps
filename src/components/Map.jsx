import React from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';
import LoadingIndicator from './LoadingIndicator';

const Maps = ( { directionsResponse } ) => {
  const { isLoaded } = useJsApiLoader( {
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  } );

  return (
    <div className='flex flex-col flex-grow justify-center items-center'>
      { isLoaded ? <GoogleMap
        mapContainerClassName='w-full sm:h-[511px] h-[357px]'
        center={ { lat: 20.5937, lng: 78.9629 } }
        zoom={ 5 }
      >
        { directionsResponse && (
          <DirectionsRenderer
            directions={ directionsResponse }
            options={ {
              polylineOptions: {
                strokeColor: 'blue',
                strokeWeight: 6
              }
            } }
          />
        ) }
        {/* <Marker /> */}
      </GoogleMap>
        : <LoadingIndicator loadingText={ 'Loading Map...' } />
      }
    </div>
  );
};

export default Maps;