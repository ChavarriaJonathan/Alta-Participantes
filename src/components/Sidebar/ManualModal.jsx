import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './ManualModal.css';

const ManualModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="manual-modal">
        <div className="modal-header">
          <h2>Manual de uso</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-content">
          <h3>Pasos a seguir</h3>
          
          <div className="manual-section">
            <h4>1. Seleccionar un Proyecto</h4>
            <p>Para comenzar, busque y seleccione un proyecto usando el buscador "Seleccionar Proyecto":</p>
            <ul>
              <li>Puede buscar por <strong>Clave de Proyecto</strong> o por <strong>Título</strong> según la opción seleccionada.</li>
              <li>Escriba al menos 3 caracteres para obtener sugerencias automáticas.</li>
              <li>También puede hacer clic en el ícono de lista para ver todos los proyectos disponibles.</li>
            </ul>
          </div>
          
          <div className="manual-section">
            <h4>2. Seleccionar un Oficio de Respuesta</h4>
            <p>Luego, seleccione un oficio de respuesta usando el buscador "Oficio Respuesta":</p>
            <ul>
              <li>Ingrese el número de oficio para buscar.</li>
              <li>Al igual que con los proyectos, puede usar el ícono de lista para ver todos los oficios disponibles.</li>
            </ul>
          </div>
          
          <div className="manual-section">
            <h4>3. Agregar Participantes</h4>
            <p>Una vez seleccionado el proyecto, puede agregar participantes de dos maneras:</p>
            <ul>
              <li><strong>Con CVU:</strong> Para investigadores que tienen CVU registrado.</li>
              <li><strong>Sin CVU:</strong> Para personas que no cuentan con CVU, donde deberá especificar su institución.</li>
            </ul>
          </div>
          
          <div className="manual-section">
            <h4>4. Registrar Participantes</h4>
            <p>Complete los campos requeridos y haga clic en:</p>
            <ul>
              <li>"Registrar Participante" para personas con CVU.</li>
              <li>"Registrar Persona Sin CVU" para personas sin CVU.</li>
            </ul>
            <p>Los participantes registrados aparecerán en la tabla de la derecha.</p>
          </div>
          
          <div className="manual-section">
            <h4>Notas importantes</h4>
            <ul>
              <li>Asegúrese de seleccionar el proyecto correcto antes de agregar participantes.</li>
              <li>Los participantes con CVU se registran como "Propuesta".</li>
              <li>Los participantes sin CVU se registran como "Solicitud".</li>
              <li>No se pueden registrar participantes duplicados en un mismo proyecto.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualModal;