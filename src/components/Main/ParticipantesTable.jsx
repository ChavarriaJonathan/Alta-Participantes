import React, { useState, useEffect } from 'react';
import { getParticipantesByProyecto } from '../services/participanteService';

const ParticipantesTable = ({ proyectoId, refreshTrigger }) => {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipantes = async () => {
      setLoading(true);
      try {
        const data = await getParticipantesByProyecto(proyectoId);
        setParticipantes(data);
      } catch (error) {
        console.error('Error fetching participantes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchParticipantes();
  }, [proyectoId, refreshTrigger]);

  if (loading) {
    return <p>Cargando participantes...</p>;
  }

  if (participantes.length === 0) {
    return <p>No hay participantes registrados para este proyecto.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>CVU</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {participantes.map((participante, index) => (
          <tr key={index}>
            <td>{participante.nombre}</td>
            <td>{participante.cvu || ''}</td>
            <td>{participante.cvu ? 'Propuesta' : 'Solicitud'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ParticipantesTable;