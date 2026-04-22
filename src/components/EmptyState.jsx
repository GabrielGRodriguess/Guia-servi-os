import React from 'react';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ onClear }) => {
  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="empty-icon-wrapper" style={{ 
        width: '80px', 
        height: '80px', 
        background: 'var(--primary-light)', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 24px',
        color: 'var(--primary)'
      }}>
        <SearchX size={40} />
      </div>
      <h2>Nenhum prestador encontrado</h2>
      <p>Tente ajustar seus filtros ou pesquisar por outro termo.</p>
      {onClear && (
        <button className="btn-secondary" onClick={onClear}>
          Limpar todos os filtros
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
