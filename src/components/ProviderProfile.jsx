import React from 'react';
import { ArrowLeft, Star, MapPin, MessageCircle, Clock, CheckCircle2, ShieldCheck, Award, Briefcase, Phone, Globe, Home, Zap, FileText } from 'lucide-react';
import { getInitials, formatWhatsAppLink } from '../utils/helpers';
import { motion } from 'framer-motion';

const ProviderProfile = ({ provider, onBack }) => {
  return (
    <motion.div 
      className="provider-profile animate-fade"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge-category" style={{ margin: 0 }}>{provider.category}</span>
                {provider.verified && (
                  <span className="badge-verified" style={{ padding: '6px 16px', fontSize: '1rem' }}>
                    <ShieldCheck size={18} /> Perfil Verificado
                  </span>
                )}
              </div>
              <h2>{provider.name}</h2>
              <div className="profile-rating-row">
                <Star size={20} fill="#FFB800" color="#FFB800" />
                <span className="rating-value">{provider.rating}</span>
                <span className="jobs-count">• {provider.experienceTime} de experiência</span>
                <span className="jobs-count">• {provider.jobs} atendimentos</span>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-grid">
              <div className="profile-main-column">
                <section className="profile-section">
                  <h3><FileText size={22} /> Sobre o Profissional</h3>
                  <p>{provider.fullDescription}</p>
                </section>

                {provider.is_etec && (
                  <div style={{ background: 'var(--accent-light)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(22, 163, 74, 0.1)', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'white', padding: '12px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                        <Award size={32} color="var(--accent)" />
                      </div>
                      <div>
                        <h3 style={{ color: 'var(--accent)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: '800' }}>
                          Formação Técnica ETEC
                          {provider.etec_status === 'verified' && <ShieldCheck size={20} color="var(--accent)" />}
                        </h3>
                        <p style={{ color: 'var(--text-main)', fontWeight: '700', marginBottom: '12px', fontSize: '1.1rem' }}>{provider.etec_unit}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '0.95rem' }}>
                          <div style={{ color: 'var(--text-muted)' }}><strong>Curso:</strong> {provider.etec_course}</div>
                          <div style={{ color: 'var(--text-muted)' }}><strong>Status:</strong> {provider.etec_relation === 'student' ? 'Estudante' : 'Formado'}</div>
                          {provider.etec_graduation_year && <div style={{ color: 'var(--text-muted)' }}><strong>Conclusão:</strong> {provider.etec_graduation_year}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <section className="profile-section">
                  <h3><Award size={22} /> Especialidades</h3>
                  <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {provider.services?.map((service, index) => (
                      <span key={index} className="tag" style={{ background: '#f1f5f9', color: 'var(--secondary)', padding: '8px 20px', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem' }}>
                        {service}
                      </span>
                    ))}
                  </div>
                </section>

                {provider.portfolioUrl && (
                  <section className="profile-section">
                    <h3><Globe size={22} /> Portfólio / Instagram</h3>
                    <a href={provider.portfolioUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                      Ver trabalhos anteriores
                    </a>
                  </section>
                )}
              </div>

              <div className="profile-side-column">
                <section className="profile-section trust-box" style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Informações de Confiança</h3>
                  
                  <div style={trustItemStyle}>
                    <ShieldCheck size={20} color={provider.verified ? 'var(--success)' : 'var(--text-muted)'} />
                    <span>Informações conferidas</span>
                  </div>
                  
                  <div style={trustItemStyle}>
                    <CheckCircle2 size={20} color={provider.hasCertificate ? 'var(--success)' : 'var(--text-muted)'} />
                    <span>{provider.hasCertificate ? 'Possui certificado' : 'Não informou certificado'}</span>
                  </div>

                  <div style={trustItemStyle}>
                    <CheckCircle2 size={20} color={provider.hasMei ? 'var(--success)' : 'var(--text-muted)'} />
                    <span>{provider.hasMei ? 'Possui MEI/CNPJ' : 'Autônomo (Pessoa Física)'}</span>
                  </div>

                  <hr style={{ margin: '20px 0', border: 0, borderTop: '1px solid var(--border)' }} />

                  <div style={trustItemStyle}>
                    <Home size={20} color={provider.worksAtHome ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span>{provider.worksAtHome ? 'Atende em domicílio' : 'Apenas no local'}</span>
                  </div>

                  <div style={trustItemStyle}>
                    <Zap size={20} color={provider.emergencyService ? 'var(--accent)' : 'var(--text-muted)'} />
                    <span>{provider.emergencyService ? 'Atende emergências' : 'Apenas horário agendado'}</span>
                  </div>

                  <div style={trustItemStyle}>
                    <Clock size={20} color="var(--primary)" />
                    <span>{provider.availability || 'Consultar horários'}</span>
                  </div>
                </section>

                <div className="profile-cta" style={{ marginTop: '24px' }}>
                  <a href={formatWhatsAppLink(provider.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-large">
                    <MessageCircle size={24} />
                    Chamar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const trustItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  fontSize: '0.95rem',
  fontWeight: '600',
  color: 'var(--text-main)'
};

export default ProviderProfile;
