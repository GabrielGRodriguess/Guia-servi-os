import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

const Header = ({ onNavigate, onOpenLogin, onOpenHowItWorks }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={() => onNavigate('home')}>
          <h1>Guia<span>Serviços</span></h1>
        </div>
        
        <nav className="desktop-nav">
          <button className="nav-link" onClick={() => onNavigate('home')}>Início</button>
          <button className="nav-link" onClick={onOpenHowItWorks}>Como funciona</button>
          <div className="header-actions">
            <button 
              className="admin-link-discreet" 
              onClick={() => onNavigate('admin')} 
              title="Painel Administrativo"
              style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px' }}
            >
              <Settings size={20} />
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('register')}>Sou prestador</button>
            <button className="btn-primary" onClick={onOpenLogin}>Entrar</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
