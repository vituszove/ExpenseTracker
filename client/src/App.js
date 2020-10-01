import React from 'react';
import './assets/base.scss';
import Header from './components/Header';
import User from './components/User';

import AutoFinancing from './components/test';

function App() {
  return (
    <div className="App">
      <div className='App-center'>
      <Header />
      <User />
      </div>
      

      {/* <AutoFinancing /> */}
    </div>
  );
}

export default App;
