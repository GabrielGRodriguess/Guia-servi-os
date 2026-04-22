import React from 'react';
import { Star, MapPin, MessageCircle, ChevronRight, ShieldCheck, Award } from 'lucide-react';
import { getInitials, formatWhatsAppLink } from '../utils/helpers';
import { motion } from 'framer-motion';

const ProviderCard = ({ provider, onSelect }) => {
  return (
    <motion.div 
      className="provider-card-v2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-top">
        <div className="provider-avatar-v2">
          {getInitials(provider.name)}
        </div>
        <div className="provider-main-info">
          <div className="card-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <span className="category-badge">{provider.category}</span>
              {provider.is_etec && (
                <div className={`badge-etec ${provider.etec_status === 'verified' ? 'badge-etec-verified' : ''}`}>
                  {provider.etec_status === 'verified' ? (
                    <><Award size={14} /> ETEC Verificado</>
                  ) : (
                    <><ShieldCheck size={14} /> {provider.etec_relation === 'student' ? 'Aluno ETEC' : 'Ex-aluno ETEC'}</>
                  )}
                </div>
              )}
            </div>
            <h3 className="provider-name">{provider.name}</h3>
          </div>
          <div className="card-rating">
            <Star size={16} fill="#FFB800" color="#FFB800" />
            <span>{provider.rating}</span>
            <span className="jobs-tag">• {provider.experienceTime} exp.</span>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <div className="location-info">
          <MapPin size={16} color="var(--primary)" />
          <span>{provider.neighborhood}, {provider.city}</span>
        </div>
        <p className="short-desc">{provider.shortDescription}</p>
        
        <div className="tags-container">
          {provider.services?.slice(0, 3).map((s, i) => (
            <span key={i} className="mini-tag">{s}</span>
          ))}
        </div>
      </div>

      <div className="card-actions-v2" style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '10px' }}>
        <button className="btn-details" onClick={() => onSelect(provider)}>
          Ver Perfil <ChevronRight size={16} />
        </button>
        <a 
          href={formatWhatsAppLink(provider.whatsapp)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-whatsapp-v2"
        >
          <MessageCircle size={20} />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default ProviderCard;
