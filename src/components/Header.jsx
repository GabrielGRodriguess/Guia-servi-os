import React from 'react';

const Header = ({ onNavigate }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={() => onNavigate('home')}>
          <h1>Guia<span>Serviços</span></h1>
        </div>
        <nav className="desktop-nav">
          <button onClick={() => onNavigate('home')}>Início</button>
          <button onClick={() => onNavigate('register')} className="btn-primary">Cadastrar meu serviço</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
