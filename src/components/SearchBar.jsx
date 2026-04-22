import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { serviceOptions } from '../data/serviceOptions';

const SearchBar = ({ value, onChange, disabled, providers = [] }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Combine fixed options with categories/tags from existing providers
  const allOptions = [
    ...new Set([
      ...serviceOptions,
      ...providers.map(p => p.category),
      ...providers.flatMap(p => p.services || [])
    ])
  ];

  useEffect(() => {
    if (value.length > 1 && !disabled) {
      const filtered = allOptions.filter(opt => 
        opt.toLowerCase().includes(value.toLowerCase()) && 
        opt.toLowerCase() !== value.toLowerCase()
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar" ref={wrapperRef} style={{ position: 'relative' }}>
      <div className="search-input-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Qual serviço você precisa? (ex: Aula de violão, Pedreiro...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length > 1 && !disabled && setShowSuggestions(true)}
          disabled={disabled}
        />
        {value && (
          <button 
            onClick={() => { onChange(''); setShowSuggestions(false); }}
            style={{ background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div className="suggestions-dropdown" style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          right: 0,
          background: 'var(--card-bg)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          zIndex: 10,
          overflow: 'hidden',
          padding: '8px 0'
        }}>
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '12px 24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '1rem',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--primary-light)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <Search size={16} color="var(--primary)" />
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
