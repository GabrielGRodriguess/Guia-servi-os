import React from 'react';
import ProviderCard from './ProviderCard';
import EmptyState from './EmptyState';

const ProviderList = ({ providers, onSelectProvider, onClearFilters }) => {
  if (providers.length === 0) {
    return <EmptyState onClear={onClearFilters} />;
  }

  return (
    <div className="provider-list-section">
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
