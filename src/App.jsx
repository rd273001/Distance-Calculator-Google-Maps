import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';

const App = () => {

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header />
      </header>

      <main className='flex flex-grow'>
        <Home />
      </main>
    </div>
  );
};

export default App;