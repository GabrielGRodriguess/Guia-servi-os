import React from 'react';
import { MapPin } from 'lucide-react';
import { cities } from '../data/cities';

const CitySelector = ({ selectedCity, onSelectCity }) => {
  return (
    <div className="city-selector-container">
      <div className="city-selector-wrapper">
        <MapPin size={20} className="city-icon" />
        <select 
          value={selectedCity || ""} 
          onChange={(e) => onSelectCity(e.target.value)}
          className="city-select"
        >
          <option value="" disabled>Selecione sua cidade</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CitySelector;
