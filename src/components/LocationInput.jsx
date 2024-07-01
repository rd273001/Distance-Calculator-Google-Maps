import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import destinationIcon from '../assets/destination.svg';
import originIcon from '../assets/origin.svg';
import stopIcon from '../assets/stop.svg';
import addIcon from '../assets/add.svg';
import deleteIcon from '../assets/delete.svg';

const LocationInput = ( { label, onChange, icon, stops = [], onRemoveStop, onAddStop } ) => {
  const {
    ready,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete( {
    requestOptions: { componentRestrictions: { country: 'in' } },
    debounce: 300,
  } );

  const handleInput = ( e ) => {
    setValue( e.target.value );
  };

  const handleSelect = async ( address ) => {
    setValue( address, false );
    clearSuggestions();

    try {
      const results = await getGeocode( { address } );
      const { lat, lng } = await getLatLng( results[0] );
      // if ( label === 'Stop' ) {
      //   onAddStop( { address, lat, lng } );
      //   setValue( '', false );
      //   return;
      // }
      onChange( { address, lat, lng } );
    } catch ( error ) {
      console.error( 'Error: ', error );
    }
  };

  const getIcon = () => {
    switch ( icon ) {
      case 'origin':
        return <img src={ originIcon } alt='Origin' className='size-4' />;
      case 'destination':
        return <img src={ destinationIcon } alt='Destination' className='size-4' />;
      case 'stop':
        return <img src={ stopIcon } alt='Stop' className='size-4' />;
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col mb-5'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        { label }
      </label>
      <div className='relative'>
        <Combobox onSelect={ handleSelect } className='w-full'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              { getIcon() }
            </div>
            <ComboboxInput
              value={ inputValue }
              onChange={ handleInput }
              disabled={ !ready }
              className='w-full px-10 py-2.5 border border-[#DCDDEC] text-[#1E2A32] font-semibold bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter location'
            />
          </div>
          <ComboboxPopover>
            <ComboboxList>
              { status === 'OK' &&
                data.map( ( { place_id, description } ) => (
                  <ComboboxOption key={ place_id } value={ description } />
                ) ) }
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>

      { label === 'Stop' && (
        <div className='mt-1 flex items-center justify-end'>
          <button
            onClick={ () => {
              setValue( '' );
              onAddStop();
            } }
            className='flex items-center'
          >
            <img src={ addIcon } alt='Add Stop' className='size-4' />
            <p className='ml-1'>Add another stop</p>
          </button>
        </div>
      ) }

      { stops.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-3'>
          { stops.map( ( stop, index ) => (
            <div key={ index } className='border border-[#DCDDEC] rounded-full px-2 py-1 flex items-center'>
              <span className='text-sm mr-2'>{ stop?.address }</span>
              <button onClick={ () => onRemoveStop( index ) } className='text-red-500'>
                <img src={ deleteIcon } alt='Remove Stop' className='size-4' />
              </button>
            </div>
          ) ) }
        </div>
      ) }

    </div>
  );
};

export default React.memo( LocationInput );