import React, { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';
import { searchProyectos } from '../services/proyectoService';

const ProyectoSearch = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('clave_proyecto');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const data = await searchProyectos(searchQuery, searchBy);
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching proyecto suggestions:', error);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, searchBy]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchByChange = (type) => {
    setSearchBy(type);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (proyecto) => {
    onSelect(proyecto);
    setSearchQuery(searchBy === 'clave_proyecto' ? proyecto.clave_proyecto : proyecto.titulo);
    setShowSuggestions(false);
  };

  const handleShowAll = async () => {
    try {
      const data = await searchProyectos('', searchBy);
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching all proyectos:', error);
    }
  };

  return (
    <div>
      <div className="search-options">
        <span 
          className={`search-option ${searchBy === 'clave_proyecto' ? 'active' : ''}`}
          onClick={() => handleSearchByChange('clave_proyecto')}
        >
          Clave de Proyecto
        </span>
        <span 
          className={`search-option ${searchBy === 'titulo' ? 'active' : ''}`}
          onClick={() => handleSearchByChange('titulo')}
        >
          Título
        </span>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder={`Buscar por ${searchBy === 'clave_proyecto' ? 'clave de proyecto' : 'título'}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleShowAll}>
          <FaList />
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((proyecto) => (
            <div
              key={proyecto.proyecto_id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(proyecto)}
            >
              {searchBy === 'clave_proyecto' 
                ? `${proyecto.clave_proyecto} - ${proyecto.titulo}`
                : `${proyecto.titulo} (${proyecto.clave_proyecto})`
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProyectoSearch;