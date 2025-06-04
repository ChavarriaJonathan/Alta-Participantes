import React, { useState, useEffect } from 'react';
import './Main.css';
import ProyectoInfo from './ProyectoInfo';
import AddParticipantes from './AddParticipantes';
import ParticipantesTable from './ParticipantesTable';
import { getProyectoDetails } from '../services/proyectoService';

const Main = ({ selectedProyecto, selectedOficio }) => {
  const [proyectoDetails, setProyectoDetails] = useState(null);
  const [participantes, setParticipantes] = useState([]);
  const [refreshParticipantes, setRefreshParticipantes] = useState(false);

  useEffect(() => {
    if (selectedProyecto) {
      const fetchProyectoDetails = async () => {
        try {
          const details = await getProyectoDetails(selectedProyecto.proyecto_id);
          setProyectoDetails(details);
        } catch (error) {
          console.error('Error fetching proyecto details:', error);
        }
      };
      fetchProyectoDetails();
    }
  }, [selectedProyecto]);

  const handleParticipanteAdded = () => {
    setRefreshParticipantes(prev => !prev);
  };

  if (!selectedProyecto) {
    return (
      <div className="main-container">
        <div className="empty-state">
          <h2>Seleccione un proyecto para comenzar</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      {proyectoDetails && (
        <ProyectoInfo 
          convocatoria={proyectoDetails.convocatoria} 
          titulo={proyectoDetails.titulo} 
        />
      )}
      <div className="participantes-section">
        <div className="add-participantes">
          <h3>Agregar Participantes</h3>
          <AddParticipantes 
            proyectoId={selectedProyecto.proyecto_id} 
            onParticipanteAdded={handleParticipanteAdded}
          />
        </div>
        <div className="participantes-list">
          <h3>Participantes</h3>
          <ParticipantesTable 
            proyectoId={selectedProyecto.proyecto_id} 
            refreshTrigger={refreshParticipantes}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;