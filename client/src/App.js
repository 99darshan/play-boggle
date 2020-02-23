import React from 'react';
import './App.css';
import BoggleProvider from './state/boggleContext';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
     <BoggleProvider>
       <Home/>
     </BoggleProvider>
    </div>
  );
}

export default App;
