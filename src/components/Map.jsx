import React from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';
import LoadingIndicator from './LoadingIndicator';
import destinationIcon from '../assets/destination.svg';
import originIcon from '../assets/origin.svg';
import stopIcon from '../assets/stop.svg';

const Maps = ( { directionsResponse, origin, destination, stops } ) => {
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
                strokeColor: '#067FD0',
                strokeWeight: 6
              },
            } }
          />
        ) }
        { origin && <Marker position={ { lat: origin.lat, lng: origin.lng } } icon={ `${originIcon}` } /> }
        { destination && <Marker position={ { lat: destination.lat, lng: destination.lng } } icon={ `${destinationIcon}` } /> }
        { stops.map( ( stop, index ) => (
          <Marker key={ index } position={ { lat: stop.lat, lng: stop.lng } } icon={ `${stopIcon}` } />
        ) ) }
      </GoogleMap>
        : <LoadingIndicator loadingText={ 'Loading Map...' } />
      }
    </div>
  );
};

export default Maps;