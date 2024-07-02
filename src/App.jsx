import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import { LoadScript } from '@react-google-maps/api';
import LoadingIndicator from './components/LoadingIndicator';

const App = () => {

  return (
    <LoadScript googleMapsApiKey={ process.env.GOOGLE_MAPS_API_KEY } libraries={ ['places'] } loadingElement={ <LoadingIndicator loadingText={ 'Loading Map...' } /> }>
      <div className='flex flex-col min-h-screen'>
        <header>
          <Header />
        </header>

        <main className='flex flex-grow'>
          <Home />
        </main>
      </div>
    </LoadScript>
  );
};

export default App;