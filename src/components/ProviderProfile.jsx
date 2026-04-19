import React from 'react';
import { ArrowLeft, Star, MapPin, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { getInitials, formatWhatsAppLink } from '../utils/helpers';
import { motion } from 'framer-motion';

const ProviderProfile = ({ provider, onBack }) => {
  return (
    <motion.div 
      className="provider-profile"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="container">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-large">
              {getInitials(provider.name)}
            </div>
            <div className="profile-title">
              <h2>{provider.name}</h2>
              <span className="badge-category">{provider.category}</span>
              <div className="profile-rating-row">
                <Star size={18} fill="#FFB800" color="#FFB800" />
                <span className="rating-value">{provider.rating}</span>
                <span className="jobs-count">({provider.jobs} atendimentos)</span>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <section className="profile-section">
              <h3>Sobre</h3>
              <p>{provider.fullDescription}</p>
            </section>

            <div className="profile-grid">
              <section className="profile-section">
                <h3>Serviços Oferecidos</h3>
                <ul className="services-list">
                  {provider.services.map((service, index) => (
                    <li key={index}>
                      <CheckCircle size={16} className="icon-success" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="profile-section">
                <h3>Informações</h3>
                <div className="info-item">
                  <MapPin size={18} />
                  <div>
                    <strong>Localização</strong>
                    <p>{provider.neighborhood}, {provider.city}</p>
                    <small>Atende em: {provider.area}</small>
                  </div>
                </div>
                <div className="info-item">
                  <Clock size={18} />
                  <div>
                    <strong>Disponibilidade</strong>
                    <p>{provider.availability}</p>
                  </div>
                </div>
              </section>
            </div>

            {provider.reviews && provider.reviews.length > 0 && (
              <section className="profile-section">
                <h3>Avaliações</h3>
                <div className="reviews-list">
                  {provider.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-meta">
                        <strong>{review.user}</strong>
                        <div className="stars">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={12} fill="#FFB800" color="#FFB800" />
                          ))}
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="profile-cta">
              <a 
                href={formatWhatsAppLink(provider.whatsapp)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp-large"
              >
                <MessageCircle size={24} />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProviderProfile;
