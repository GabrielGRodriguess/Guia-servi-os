import React from 'react';
import { SearchX, PlusCircle, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptySearchState = ({ searchTerm, onRegisterService, onRequestService }) => {
  return (
    <motion.div 
      className="empty-state animate-fade"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ 
        padding: '60px 20px', 
        textAlign: 'center', 
        background: 'var(--card-bg)', 
        borderRadius: '32px',
        border: '1px solid var(--border)',
        margin: '40px 0'
      }}
    >
      <div className="empty-icon-wrapper" style={{ 
        width: '100px', 
        height: '100px', 
        background: 'var(--primary-light)', 
        borderRadius: '32px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 32px',
        color: 'var(--primary)',
        transform: 'rotate(-10deg)'
      }}>
        <SearchX size={48} />
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>
        Ainda não temos profissionais para esse serviço
      </h2>
      
      <p style={{ 
        color: 'var(--text-muted)', 
        fontSize: '1.1rem', 
        maxWidth: '500px', 
        margin: '0 auto 40px',
        lineHeight: '1.6'
      }}>
        Você pesquisou por: <strong>"{searchTerm}"</strong>. 
        Esse serviço ainda não possui profissionais cadastrados na sua região.
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          className="btn-secondary" 
          onClick={() => onRequestService(searchTerm)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px' }}
        >
          <BellRing size={20} />
          Quero esse serviço
        </button>
        
        <button 
          className="btn-primary" 
          onClick={() => onRegisterService(searchTerm)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px' }}
        >
          <PlusCircle size={20} />
          Cadastrar meu serviço
        </button>
      </div>
    </motion.div>
  );
};

export default EmptySearchState;
