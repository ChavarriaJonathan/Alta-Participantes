import React, { useState, useEffect } from 'react';
import { searchPersonaByCVU, searchPersonaByNombre, getInstituciones, registrarPersonaConCVU, registrarPersonaSinCVU } from '../services/participanteService';

const AddParticipantes = ({ proyectoId, onParticipanteAdded }) => {
  const [tipo, setTipo] = useState('conCVU');
  const [cvu, setCvu] = useState('');
  const [nombre, setNombre] = useState('');
  const [institucionId, setInstitucionId] = useState('');
  const [instituciones, setInstituciones] = useState([]);
  const [cvuSuggestions, setCvuSuggestions] = useState([]);
  const [nombreSuggestions, setNombreSuggestions] = useState([]);
  const [showCvuSuggestions, setShowCvuSuggestions] = useState(false);
  const [showNombreSuggestions, setShowNombreSuggestions] = useState(false);

  useEffect(() => {
    const fetchInstituciones = async () => {
      try {
        const data = await getInstituciones();
        setInstituciones(data);
      } catch (error) {
        console.error('Error fetching instituciones:', error);
      }
    };
    fetchInstituciones();
  }, []);

  useEffect(() => {
    if (cvu.length > 2 && tipo === 'conCVU') {
      const fetchSuggestions = async () => {
        try {
          const data = await searchPersonaByCVU(cvu);
          setCvuSuggestions(data);
          setShowCvuSuggestions(true);
        } catch (error) {
          console.error('Error fetching CVU suggestions:', error);
          setCvuSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setCvuSuggestions([]);
      setShowCvuSuggestions(false);
    }
  }, [cvu, tipo]);

  useEffect(() => {
    if (nombre.length > 2 && tipo === 'conCVU') {
      const fetchSuggestions = async () => {
        try {
          const data = await searchPersonaByNombre(nombre);
          setNombreSuggestions(data);
          setShowNombreSuggestions(true);
        } catch (error) {
          console.error('Error fetching nombre suggestions:', error);
          setNombreSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setNombreSuggestions([]);
      setShowNombreSuggestions(false);
    }
  }, [nombre, tipo]);

  const handleCvuChange = (e) => {
    setCvu(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCvuSuggestionClick = (persona) => {
    setCvu(persona.cvu);
    setNombre(persona.nombre);
    setShowCvuSuggestions(false);
  };

  const handleNombreSuggestionClick = (persona) => {
    setCvu(persona.cvu);
    setNombre(persona.nombre);
    setShowNombreSuggestions(false);
  };

  const handleInstitucionChange = (e) => {
    setInstitucionId(e.target.value);
  };

  const handleTipoChange = (nuevoTipo) => {
    setTipo(nuevoTipo);
    setCvu('');
    setNombre('');
    setInstitucionId('');
  };

  const handleRegistrarConCVU = async (e) => {
    e.preventDefault();
    if (!cvu || !nombre) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await registrarPersonaConCVU(cvu, nombre, proyectoId);
      alert('Participante registrado con éxito');
      setCvu('');
      setNombre('');
      onParticipanteAdded();
    } catch (error) {
      console.error('Error registrando participante con CVU:', error);
      alert('Error al registrar participante');
    }
  };

  const handleRegistrarSinCVU = async (e) => {
    e.preventDefault();
    if (!nombre || !institucionId) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await registrarPersonaSinCVU(nombre, institucionId, proyectoId);
      alert('Persona sin CVU registrada con éxito');
      setNombre('');
      setInstitucionId('');
      onParticipanteAdded();
    } catch (error) {
      console.error('Error registrando persona sin CVU:', error);
      alert('Error al registrar persona');
    }
  };

  return (
    <div>
      <div className="option-tabs">
        <div 
          className={`option-tab ${tipo === 'conCVU' ? 'active' : ''}`}
          onClick={() => handleTipoChange('conCVU')}
        >
          Con CVU
        </div>
        <div 
          className={`option-tab ${tipo === 'sinCVU' ? 'active' : ''}`}
          onClick={() => handleTipoChange('sinCVU')}
        >
          Sin CVU
        </div>
      </div>

      {tipo === 'conCVU' ? (
        <form onSubmit={handleRegistrarConCVU}>
          <div className="form-group">
            <label>CVU</label>
            <input 
              type="text" 
              value={cvu} 
              onChange={handleCvuChange}
              placeholder="Ingrese CVU"
            />
            {showCvuSuggestions && cvuSuggestions.length > 0 && (
              <div className="suggestions-container">
                {cvuSuggestions.map((persona) => (
                  <div
                    key={persona.cvu}
                    className="suggestion-item"
                    onClick={() => handleCvuSuggestionClick(persona)}
                  >
                    {`${persona.cvu} - ${persona.nombre}`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={handleNombreChange}
              placeholder="Ingrese nombre"
            />
            {showNombreSuggestions && nombreSuggestions.length > 0 && (
              <div className="suggestions-container">
                {nombreSuggestions.map((persona) => (
                  <div
                    key={persona.cvu}
                    className="suggestion-item"
                    onClick={() => handleNombreSuggestionClick(persona)}
                  >
                    {`${persona.nombre} (${persona.cvu})`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="submit-button">Registrar Participante</button>
        </form>
      ) : (
        <form onSubmit={handleRegistrarSinCVU}>
          <div className="form-group">
            <label>Seleccionar Institución</label>
            <select value={institucionId} onChange={handleInstitucionChange}>
              <option value="">Seleccionar...</option>
              {instituciones.map((institucion) => (
                <option 
                  key={institucion.instituciones_id} 
                  value={institucion.instituciones_id}
                >
                  {institucion.nombre_instituciones}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={handleNombreChange}
              placeholder="Ingrese nombre"
            />
          </div>
          <button type="submit" className="submit-button">Registrar Persona Sin CVU</button>
        </form>
      )}
    </div>
  );
};

export default AddParticipantes;