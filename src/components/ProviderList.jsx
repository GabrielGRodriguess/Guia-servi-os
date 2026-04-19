import React from 'react';
import ProviderCard from './ProviderCard';
import EmptyState from './EmptyState';

const ProviderList = ({ providers, onSelectProvider, onClearFilters }) => {
  if (providers.length === 0) {
    return <EmptyState onClear={onClearFilters} />;
  }

  return (
    <div className="provider-list-section">
      <h3>Prestadores Recomendados</h3>
      <div className="provider-grid">
        {providers.map(provider => (
          <ProviderCard 
            key={provider.id} 
            provider={provider} 
            onSelect={onSelectProvider} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProviderList;
