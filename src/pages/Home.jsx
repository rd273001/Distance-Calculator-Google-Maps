import React, { useCallback, useState } from 'react';
import Map from '../components/Map';
import { LoadScript } from '@react-google-maps/api';
import LocationInput from '../components/LocationInput';
import addIcon from '../assets/add.svg';
import DistanceCard from '../components/DistanceCard';

const Home = () => {
  const [origin, setOrigin] = useState( '' );
  const [destination, setDestination] = useState( '' );
  const [stops, setStops] = useState( [] );
  const [distance, setDistance] = useState( null );
  const [directionsResponse, setDirectionsResponse] = useState( null );

  const handleCalculate = useCallback( () => {
    const directionsService = new google.maps.DirectionsService();
    const waypoints = stops.map( stop => ( { location: stop } ) );

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      ( result, status ) => {
        if ( status === google.maps.DirectionsStatus.OK ) {
          setDirectionsResponse( result );
          const totalDistance = result.routes[0].legs.reduce(
            ( total, leg ) => total + leg.distance.value,
            0
          );
          setDistance( Math.round( totalDistance / 1000 ) ); // Convert meters to kilometers
        } else {
          console.error( `Directions request failed due to ${ status }` );
        }
      }
    );
  }, [origin, destination, stops] );

  const handleAddStop = useCallback( () => {
    setStops( [...stops, ''] );
  }, [stops] );

  const handleRemoveStop = useCallback( ( index ) => {
    const newStops = stops.filter( ( _, i ) => i !== index );
    setStops( newStops );
  }, [stops] );

  return (
    <LoadScript googleMapsApiKey={ process.env.GOOGLE_MAPS_API_KEY } libraries={ ['places'] }>
      <div className='flex flex-col flex-grow bg-[#F4F8FA] sm:px-8 pb-5'>
        <div className='font-sans sm:block hidden text-center text-[#1B31A8] text-xl my-4'><p>Let's calculate<span className='font-semibold'> distance </span>from Google maps</p></div>
        <div className='sm:px-0 px-4 sm:py-4 md:flex md:flex-row gap-x-16 flex flex-col-reverse'>
          {/* Inputs */ }
          <div className='md:w-1/2 md:flex md:justify-around gap-x-6'>
            <div>
              <LocationInput
                label='Origin'
                value={ origin }
                onChange={ setOrigin }
                icon='origin'
              />

              <LocationInput
                label='Stop'
                icon='stop'
                stops={ stops }
                onRemoveStop={ handleRemoveStop }
                onAddStop={ handleAddStop }
                onChange={ ( value ) => {
                  const newStops = [...stops];
                  newStops[newStops.length - 1] = value;
                  setStops( newStops );
                } }
              />

              <LocationInput
                label='Destination'
                value={ destination }
                onChange={ setDestination }
                icon='destination'
              />
            </div>

            <div className='flex items-center justify-center'>
              <button
                className='rounded-full bg-[#1B31A8] text-white font-semibold text-xl px-8 py-3.5'
                onClick={ handleCalculate }
              >
                Calculate
              </button>
            </div>

            { distance && (
              <DistanceCard
                distance={ distance }
                origin={ origin }
                destination={ destination }
              />
            ) }

          </div>

          {/* Map */ }
          <div className='md:w-1/2'>
            <Map
              directionsResponse={ directionsResponse }
              origin={ origin }
              destination={ destination }
              stops={ stops }
            />
          </div>

        </div>
      </div>
    </LoadScript>
  );
};

export default Home;