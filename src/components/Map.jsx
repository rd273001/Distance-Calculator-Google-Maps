import React from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import destinationIcon from '../assets/destination.svg';
import originIcon from '../assets/origin.svg';
import stopIcon from '../assets/stop.svg';

const Maps = ( { directionsResponse, origin, destination, stops } ) => {

  return (
    <div className='flex flex-col flex-grow justify-center items-center'>
      <GoogleMap
        mapContainerClassName='w-full sm:h-[400px] md:h-[511px] h-[357px]'
        center={ { lat: 20.5937, lng: 78.9629 } }
        zoom={ 5 }
        options={ {
          keyboardShortcuts: false
        } }
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
        <Marker position={ { lat: origin.lat, lng: origin.lng } } icon={ { url: originIcon, scaledSize: new window.google.maps.Size( 30, 30 ), } } />
        <Marker position={ { lat: destination.lat, lng: destination.lng } } icon={ { url: destinationIcon } } />
        { stops.map( ( stop, index ) => (
          <Marker key={ index } position={ { lat: stop.lat, lng: stop.lng } } icon={ { url: stopIcon } } />
        ) ) }
      </GoogleMap>
    </div>
  );
};

export default Maps;