import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, UserCircle, ShieldCheck, Zap, Award, Search, MessageSquare } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '400px' }}
      >
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="login-icon-wrapper">
            <UserCircle size={48} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Entrar na conta</h2>
          <p style={{ color: 'var(--text-muted)' }}>Acesse seu painel de prestador</p>
        </div>

        <form style={{ display: 'grid', gap: '20px' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.9rem' }}>WhatsApp ou E-mail</label>
            <input type="text" placeholder="Seu acesso" style={modalInputStyle} />
          </div>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.9rem' }}>Senha</label>
            <input type="password" placeholder="••••••••" style={modalInputStyle} />
          </div>
          <button className="btn-primary" style={{ padding: '16px', fontSize: '1rem' }} onClick={(e) => { e.preventDefault(); alert('Simulação: Login efetuado!'); onClose(); }}>
            Entrar agora
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Não tem uma conta? <span style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }}>Cadastre-se</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const HowItWorksModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    { 
      icon: <Search size={24} />, 
      title: "Busque o serviço", 
      desc: "Escolha sua cidade e digite o serviço que você precisa." 
    },
    { 
      icon: <Zap size={24} />, 
      title: "Escolha o técnico", 
      desc: "Veja os perfis, avaliações e o destaque para alunos/ex-alunos ETEC." 
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "Negocie via WhatsApp", 
      desc: "Fale direto com o prestador sem intermediários ou taxas." 
    },
    { 
      icon: <Award size={24} />, 
      title: "Qualidade Garantida", 
      desc: "Dê preferência a perfis verificados e com formação técnica." 
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px', textAlign: 'center' }}>
          Como funciona o Guia?
        </h2>

        <div className="how-it-works-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--primary-light)', padding: '24px', borderRadius: '20px', marginTop: '32px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <ShieldCheck size={32} color="var(--primary)" />
            <div>
              <h4 style={{ color: 'var(--primary)', marginBottom: '4px' }}>Segurança Primeiro</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0 }}>
                O Guia Serviços é um facilitador. Sempre peça orçamentos e verifique referências antes de contratar.
              </p>
            </div>
          </div>
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: '32px', padding: '16px' }} onClick={onClose}>
          Entendi, vamos lá!
        </button>
      </motion.div>
    </div>
  );
};

const modalInputStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: '1px solid var(--border)',
  background: '#f8fafc',
  fontSize: '1rem',
  outline: 'none'
};
