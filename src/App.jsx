import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import './App.css';

function App() {
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [selectedOficio, setSelectedOficio] = useState(null);

  return (
    <div className="app">
      <Sidebar 
        onProyectoSelect={setSelectedProyecto}
        onOficioSelect={setSelectedOficio}
      />
      <Main 
        selectedProyecto={selectedProyecto}
        selectedOficio={selectedOficio}
      />
    </div>
  );
}

export default App;