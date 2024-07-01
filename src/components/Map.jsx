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
        center={ { lat: origin ? origin?.lat : 20.5937, lng: origin ? origin?.lng : 78.9629 } }
        zoom={ 5 }
        options={ {
          keyboardShortcuts: false,
          scaleControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          isFractionalZoomEnabled: true,
        } }
      >
        { directionsResponse && (
          <DirectionsRenderer
            directions={ directionsResponse }
            options={ {
              polylineOptions: {
                strokeColor: '#067FD0',
                strokeWeight: 6,
                strokeOpacity: 0.75,
              },
              suppressMarkers: true,
            } }
          />
        ) }

        { origin && <Marker
          position={ { lat: origin.lat, lng: origin.lng } }
          icon={ { url: originIcon } }
        /> }
        { destination && <Marker
          position={ { lat: destination.lat, lng: destination.lng } }
          icon={ { url: destinationIcon } }
        /> }
        { stops.length > 0 && stops.map( ( stop, index ) => (
          <Marker
            key={ index }
            position={ { lat: stop.lat, lng: stop.lng } }
            icon={ { url: stopIcon } }
          />
        ) ) }
      </GoogleMap>
    </div>
  );
};

export default Maps;