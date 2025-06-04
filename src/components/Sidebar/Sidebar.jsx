import React, { useState } from 'react';
import { FaList, FaQuestionCircle } from 'react-icons/fa'; // Cambiado a FaQuestionCircle
import './Sidebar.css';
import ProyectoSearch from './ProyectoSearch';
import OficioSearch from './OficioSearch';
import ManualModal from './ManualModal';

const Sidebar = ({ onProyectoSelect, onOficioSelect }) => {
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [selectedOficio, setSelectedOficio] = useState(null);
  const [showManual, setShowManual] = useState(false);

  const handleProyectoSelect = (proyecto) => {
    setSelectedProyecto(proyecto);
    onProyectoSelect(proyecto);
  };

  const handleOficioSelect = (oficio) => {
    setSelectedOficio(oficio);
    onOficioSelect(oficio);
  };

  const toggleManual = () => {
    setShowManual(!showManual);
  };

  return (
    <div className="sidebar">
      <div className="search-section">
        <div className="section-header">
          <h3>Seleccionar Proyecto</h3>
          <button 
            className="help-button" 
            onClick={toggleManual}
            title="Manual de uso"
          >
            <FaQuestionCircle size={16} /> {/* Tamaño explícito */}
          </button>
        </div>
        <ProyectoSearch onSelect={handleProyectoSelect} />
      </div>
      <div className="search-section">
        <h3>Oficio Respuesta</h3>
        <OficioSearch onSelect={handleOficioSelect} />
      </div>

      {showManual && <ManualModal onClose={toggleManual} />}
    </div>
  );
};

export default Sidebar;