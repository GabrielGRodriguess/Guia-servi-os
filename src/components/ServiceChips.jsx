import React from 'react';
import { motion } from 'framer-motion';

const ServiceChips = ({ services, selectedService, onSelectService }) => {
  if (services.length === 0) return null;

  return (
    <div className="service-chips-section">
      <h3 className="section-title">Serviços populares na sua cidade</h3>
      <div className="chips-container">
        {services.map((service) => (
          <motion.button
            key={service}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`service-chip ${selectedService === service ? 'active' : ''}`}
            onClick={() => onSelectService(selectedService === service ? null : service)}
          >
            {service}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ServiceChips;
