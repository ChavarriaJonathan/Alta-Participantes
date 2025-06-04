import React from 'react';

const ProyectoInfo = ({ convocatoria, titulo }) => {
  return (
    <div className="proyecto-info">
      <h2>Información del Proyecto</h2>
      <p><span className="label">Convocatoria:</span> {convocatoria}</p>
      <p><span className="label">Título:</span> {titulo}</p>
    </div>
  );
};

export default ProyectoInfo;