import React, { useCallback, useState } from 'react';
import Map from '../components/Map';
import { LoadScript, useJsApiLoader } from '@react-google-maps/api';
import LocationInput from '../components/LocationInput';
import DistanceCard from '../components/DistanceCard';
import LoadingIndicator from '../components/LoadingIndicator';

const Home = () => {
  const [origin, setOrigin] = useState( null );
  const [destination, setDestination] = useState( null );
  const [stop, setStop] = useState( null );
  const [stops, setStops] = useState( [] );
  const [distance, setDistance] = useState( null );
  const [directionsResponse, setDirectionsResponse] = useState( null );
  const [isLoading, setIsLoading] = useState( false );
  const [calculated, setCalculated] = useState( false ); // Track if calculation has been done

  const { isLoaded } = useJsApiLoader( {
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  } );

  const handleCalculate = useCallback( () => {
    if ( !origin || !destination )
      return;
    setIsLoading( true );
    const directionsService = new google.maps.DirectionsService();
    const waypoints = stops.map( stop => ( { location: stop?.address } ) );

    directionsService.route(
      {
        origin: origin?.address,
        destination: destination?.address,
        waypoints,
        provideRouteAlternatives: true,
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
          setIsLoading( false );
          setCalculated( true ); // Set calculated to true after successful calculation
        } else {
          setIsLoading( false );
          console.error( `Directions request failed due to ${ status }` );
        }
      }
    );
  }, [origin?.address, destination?.address, stops.length] );

  const handleOriginChange = useCallback( ( newOrigin ) => {
    setOrigin( newOrigin );
    setCalculated( false ); // Reset calculated when origin changes
  }, [] );

  const handleDestinationChange = useCallback( ( newDestination ) => {
    setDestination( newDestination );
    setCalculated( false ); // Reset calculated when destination changes
  }, [] );

  const handleAddStop = useCallback( () => {
    if ( !stop )
      return;
    if ( stops.find( stops => stops?.address === stop?.address ) ) {
      alert( 'Stop already added!' );
      return;
    }
    setStops( [...stops, stop] );
    setStop( null );
    setCalculated( false ); // Reset calculated when adding a stop
  }, [stops.length, stop?.address] );

  const handleRemoveStop = useCallback( ( index ) => {
    const newStops = stops.filter( ( _, i ) => i !== index );
    setStops( newStops );
    setCalculated( false ); // Reset calculated when removing a stop
  }, [stops] );

  return (
    <LoadScript googleMapsApiKey={ process.env.GOOGLE_MAPS_API_KEY } libraries={ ['places'] } loadingElement={ <LoadingIndicator loadingText={ 'Loading Map...' } /> } >
      <div className='flex flex-col flex-grow bg-[#F4F8FA] md:px-8 pb-5'>
        <div className='font-sans sm:block hidden text-center text-[#1B31A8] text-xl my-4'><p>Let's calculate<span className='font-semibold'> distance </span>from Google maps</p></div>
        <div className='md:px-4 px-0 md:py-4 flex md:flex-row lg:gap-x-16 gap-x-8 flex-col-reverse md:justify-evenly'>
          <div className='flex flex-col gap-y-6 lg:w-2/5 md:w-1/2 w-full md:px-0 px-4'>
            <div className='md:flex-row flex flex-col md:justify-between gap-x-6 md:flex-grow-0 flex-grow'>
              {/* Inputs */ }
              <div className='lg:w-2/3 w-full'>
                <LocationInput
                  label='Origin'
                  value={ origin?.address }
                  onChange={ handleOriginChange }
                  icon='origin'
                />

                <LocationInput
                  label='Stop'
                  icon='stop'
                  stops={ stops }
                  onRemoveStop={ handleRemoveStop }
                  onAddStop={ handleAddStop }
                  onChange={ setStop }
                />


                <LocationInput
                  label='Destination'
                  value={ destination?.address }
                  onChange={ handleDestinationChange }
                  icon='destination'
                />
              </div>

              <div className='flex items-center justify-center'>
                <button
                  className='rounded-full bg-[#1B31A8] text-white font-semibold text-xl px-8 md:py-3.5 py-2'
                  onClick={ handleCalculate }
                >
                  Calculate
                </button>
              </div>
            </div>

            { calculated && distance && (
              <DistanceCard
                distance={ distance }
                origin={ origin?.address }
                destination={ destination?.address }
              />
            ) }
          </div>

          {/* Map */ }
          <div className='lg:w-2/5 md:w-1/2 w-full md:mb-0 mb-5'>
            { isLoaded ? <Map
              directionsResponse={ directionsResponse }
              origin={ origin }
              destination={ destination }
              stops={ stops }
            /> : <LoadingIndicator loadingText={ 'Loading Map...' } /> }
          </div>

        </div>
        { isLoading && <LoadingIndicator loadingText={ 'Calculating...' } /> }
      </div>
    </LoadScript>
  );
};

export default Home;