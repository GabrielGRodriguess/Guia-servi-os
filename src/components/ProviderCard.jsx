import React from 'react';
import { Star, MapPin, MessageCircle } from 'lucide-react';
import { getInitials, formatWhatsAppLink } from '../utils/helpers';
import { motion } from 'framer-motion';

const ProviderCard = ({ provider, onSelect }) => {
  return (
    <motion.div 
      className="provider-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="provider-header">
        <div className="provider-avatar">
          {getInitials(provider.name)}
        </div>
        <div className="provider-info">
          <h4>{provider.name}</h4>
          <span className="provider-category">{provider.category}</span>
        </div>
        <div className="provider-rating">
          <Star size={14} fill="#FFB800" color="#FFB800" />
          <span>{provider.rating}</span>
        </div>
      </div>
      
      <div className="provider-location">
        <MapPin size={14} />
        <span>{provider.neighborhood}, {provider.city}</span>
      </div>
      
      <p className="provider-description">{provider.shortDescription}</p>
      
      <div className="provider-stats">
        <span>{provider.jobs} atendimentos</span>
      </div>

      <div className="provider-actions">
        <button className="btn-secondary" onClick={() => onSelect(provider)}>Ver perfil</button>
        <a 
          href={formatWhatsAppLink(provider.whatsapp)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ProviderCard;
