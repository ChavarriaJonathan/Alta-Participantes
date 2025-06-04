import React, { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';
import { searchOficios } from '../services/oficioService';

const OficioSearch = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const data = await searchOficios(searchQuery);
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching oficio suggestions:', error);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (oficio) => {
    onSelect(oficio);
    setSearchQuery(oficio.no_oficio);
    setShowSuggestions(false);
  };

  const handleShowAll = async () => {
    try {
      const data = await searchOficios('');
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching all oficios:', error);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por número de oficio"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleShowAll}>
          <FaList />
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((oficio) => (
            <div
              key={oficio.oficio_id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(oficio)}
            >
              {oficio.no_oficio}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OficioSearch;