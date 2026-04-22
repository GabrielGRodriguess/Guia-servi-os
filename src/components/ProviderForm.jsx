import React, { useState } from 'react';
import { 
  X, Upload, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, 
  Award, MapPin, Briefcase, Clock, Smartphone, Globe, GraduationCap, BookOpen, User, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { generateId } from '../utils/helpers';

const ProviderForm = ({ initialService = '', initialData = null, onBack, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: initialService,
    city: 'Araçatuba',
    neighborhood: '',
    whatsapp: '',
    shortDescription: '',
    services: '',
    experienceTime: '3 a 5 anos',
    availability: '',
    worksAtHome: false,
    emergencyService: false,
    hasCertificate: false,
    hasMei: false,
    portfolioUrl: '',
    is_etec: false,
    etec_relation: 'none',
    etec_unit: '',
    etec_course: '',
    etec_start_year: '',
    etec_graduation_year: '',
    technical_area: '',
    fullDescription: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const isEditing = !!initialData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const formattedProvider = {
        ...formData,
        id: isEditing ? initialData.id : generateId(),
        services: typeof formData.services === 'string' 
          ? formData.services.split(',').map(s => s.trim()).filter(s => s !== '')
          : formData.services,
        status: isEditing ? initialData.status : 'approved', 
        etec_status: formData.is_etec 
          ? (isEditing ? initialData.etec_status : 'informed') 
          : 'none',
        createdAt: isEditing ? initialData.createdAt : new Date().toISOString(),
        verified: isEditing ? initialData.verified : false,
        rating: isEditing ? initialData.rating : 5.0,
        jobs: isEditing ? initialData.jobs : 0,
        reviews: isEditing ? initialData.reviews : [],
        workPhotos: isEditing ? initialData.workPhotos : [],
        provider_status: isEditing ? initialData.provider_status : 'pending'
      };

      if (onSubmit) {
        onSubmit(formattedProvider);
      }
      
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Erro ao processar prestador:', err);
      alert('Ocorreu um erro ao realizar o processo. Por favor, tente novamente.');
    }
  };

  if (submitted) {
    return (
      <motion.div 
        className="container" 
        style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={{ 
          background: 'var(--card-bg)', 
          padding: '60px 40px', 
          borderRadius: '40px', 
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ color: 'var(--primary)', marginBottom: '24px' }}>
            <CheckCircle2 size={100} style={{ margin: '0 auto' }} />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: 'var(--text-main)' }}>
            {isEditing ? 'Perfil Atualizado!' : 'Cadastro Realizado!'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Obrigado, <strong>{formData.name}</strong>. {isEditing ? 'As alterações foram salvas com sucesso.' : `Seu perfil já está disponível na listagem de ${formData.city}.`}
          </p>
          <div style={{ display: 'grid', gap: '16px' }}>
            <button className="btn-primary" onClick={onBack} style={{ width: '100%', padding: '18px', backgroundColor: 'var(--primary)' }}>
              Ir para a Página Inicial
            </button>
            <button 
              onClick={() => setSubmitted(false)} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-muted)', 
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Cadastrar outro serviço
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 24px 100px' }}>
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <motion.div 
        className="form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          background: 'var(--card-bg)', 
          padding: '48px', 
          borderRadius: '40px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '12px', color: 'var(--primary)' }}>
            Seja um prestador parceiro
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Complete seu perfil para passar mais confiança aos seus clientes.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '40px' }}>
          
          <section className="form-section">
            <h3 style={sectionTitleStyle}><User size={20} /> Dados Principais</h3>
            <div style={grid2Style}>
              <div className="input-group">
                <label style={labelStyle}>Nome Completo</label>
                <input type="text" name="name" required placeholder="Seu nome" value={formData.name} onChange={handleChange} style={inputStyle} />
              </div>
              <div className="input-group">
                <label style={labelStyle}>WhatsApp</label>
                <input type="tel" name="whatsapp" required placeholder="18999999999" value={formData.whatsapp} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div style={grid2Style}>
              <div className="input-group">
                <label style={labelStyle}>Serviço / Profissão</label>
                <input type="text" name="category" required placeholder="Ex: Pedreiro" value={formData.category} onChange={handleChange} style={inputStyle} />
              </div>
              <div className="input-group">
                <label style={labelStyle}>Descrição Curta</label>
                <input type="text" name="shortDescription" required placeholder="Ex: Especialista em reformas finas" value={formData.shortDescription} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div style={grid2Style}>
              <div className="input-group">
                <label style={labelStyle}>Cidade</label>
                <select name="city" value={formData.city} onChange={handleChange} style={inputStyle}>
                  <option value="Araçatuba">Araçatuba</option>
                  <option value="Birigui">Birigui</option>
                  <option value="Guararapes">Guararapes</option>
                  <option value="Bauru">Bauru</option>
                  <option value="Valparaíso">Valparaíso</option>
                  <option value="Rubiácea">Rubiácea</option>
                  <option value="Bento de Abreu">Bento de Abreu</option>
                </select>
              </div>
              <div className="input-group">
                <label style={labelStyle}>Bairro</label>
                <input type="text" name="neighborhood" required placeholder="Ex: Centro" value={formData.neighborhood} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3 style={sectionTitleStyle}><Briefcase size={20} /> Experiência Profissional</h3>
            <div style={grid2Style}>
              <div className="input-group">
                <label style={labelStyle}>Tempo de Profissão</label>
                <select name="experienceTime" value={formData.experienceTime} onChange={handleChange} style={inputStyle}>
                  <option value="Menos de 1 ano">Menos de 1 ano</option>
                  <option value="1 a 2 anos">1 a 2 anos</option>
                  <option value="3 a 5 anos">3 a 5 anos</option>
                  <option value="6 a 10 anos">6 a 10 anos</option>
                  <option value="Mais de 10 anos">Mais de 10 anos</option>
                </select>
              </div>
              <div className="input-group">
                <label style={labelStyle}>Instagram / Portfólio (Opcional)</label>
                <input type="url" name="portfolioUrl" placeholder="https://instagram.com/seu_perfil" value={formData.portfolioUrl} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div className="input-group">
              <label style={labelStyle}>Descrição Completa (Fale mais sobre seu trabalho)</label>
              <textarea name="fullDescription" placeholder="Ex: Atuo no mercado há 5 anos, focado em..." value={formData.fullDescription} onChange={handleChange} style={{ ...inputStyle, height: '100px', resize: 'vertical' }} />
            </div>
            <div className="input-group" style={{ marginTop: '20px' }}>
              <label style={labelStyle}>Especialidades (separe por vírgula)</label>
              <textarea name="services" placeholder="Ex: Pintura, Piso, Elétrica" value={formData.services} onChange={handleChange} style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />
            </div>
          </section>

          <section className="form-section">
            <h3 style={{ ...sectionTitleStyle, color: 'var(--accent)' }}><Award size={20} /> Vínculo com a ETEC</h3>
            
            <div className="input-group">
              <label style={labelStyle}>Você tem vínculo com a ETEC?</label>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label style={checkboxLabelStyle}>
                  <input 
                    type="radio" 
                    name="is_etec" 
                    checked={formData.is_etec === true} 
                    onChange={() => setFormData(prev => ({ ...prev, is_etec: true }))} 
                  /> Sim
                </label>
                <label style={checkboxLabelStyle}>
                  <input 
                    type="radio" 
                    name="is_etec" 
                    checked={formData.is_etec === false} 
                    onChange={() => setFormData(prev => ({ ...prev, is_etec: false }))} 
                  /> Não
                </label>
              </div>
            </div>

            {formData.is_etec && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ background: 'var(--accent-light)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(22, 163, 74, 0.1)', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                      <GraduationCap size={24} color="var(--accent)" />
                    </div>
                    <h3 style={{ margin: 0, color: 'var(--accent)', fontWeight: '800' }}>Dados Técnicos ETEC</h3>
                  </div>
                  
                  <div style={grid2Style}>
                    <div className="input-group">
                      <label style={labelStyle}><BookOpen size={16} /> Unidade ETEC</label>
                      <input 
                        type="text" 
                        name="etec_unit" 
                        placeholder="Ex: ETEC de Guararapes" 
                        value={formData.etec_unit} 
                        onChange={handleChange} 
                        style={inputStyle} 
                      />
                    </div>
                    <div className="input-group">
                      <label style={labelStyle}><Award size={16} /> Curso Técnico</label>
                      <input 
                        type="text" 
                        name="etec_course" 
                        placeholder="Ex: Edificações" 
                        value={formData.etec_course} 
                        onChange={handleChange} 
                        style={inputStyle} 
                      />
                    </div>
                  </div>
                  
                  <div style={{ ...grid2Style, marginTop: '20px' }}>
                    <div className="input-group">
                      <label style={labelStyle}>Tipo de Vínculo</label>
                      <select name="etec_relation" value={formData.etec_relation} onChange={handleChange} style={inputStyle}>
                        <option value="student">Aluno Atual</option>
                        <option value="alumni">Ex-aluno (Formado)</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label style={labelStyle}>Ano de Conclusão / Previsão</label>
                      <input 
                        type="text" 
                        name="etec_graduation_year" 
                        placeholder="Ex: 2024" 
                        value={formData.etec_graduation_year} 
                        onChange={handleChange} 
                        style={inputStyle} 
                      />
                    </div>
                  </div>

                  <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '12px', border: '1px solid #fef3c7', marginTop: '24px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#92400e', margin: 0, display: 'flex', gap: '8px' }}>
                      <ShieldCheck size={16} /> 
                      <span><strong>Atenção:</strong> O vínculo será exibido como "Informado" até que um administrador confirme os dados. Esta é uma plataforma independente.</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </section>

          <section className="form-section">
            <h3 style={sectionTitleStyle}><ShieldCheck size={20} /> Confiança e Atendimento</h3>
            <div style={grid2Style}>
              <div className="input-group">
                <label style={labelStyle}>Horário de Atendimento</label>
                <input type="text" name="availability" placeholder="Ex: Seg a Sex, 8h às 18h" value={formData.availability} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignSelf: 'end' }}>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" name="worksAtHome" checked={formData.worksAtHome} onChange={handleChange} /> Atende em domicílio
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" name="emergencyService" checked={formData.emergencyService} onChange={handleChange} /> Atende emergência
                </label>
              </div>
            </div>
            <div style={{ ...grid2Style, marginTop: '16px' }}>
              <label style={checkboxLabelStyle}>
                <input type="checkbox" name="hasCertificate" checked={formData.hasCertificate} onChange={handleChange} /> Possuo certificado de curso/especialização
              </label>
              <label style={checkboxLabelStyle}>
                <input type="checkbox" name="hasMei" checked={formData.hasMei} onChange={handleChange} /> Possuo MEI ou CNPJ
              </label>
            </div>
          </section>

          <button type="submit" className="btn-primary" style={{ padding: '20px', fontSize: '1.2rem', marginTop: '20px' }}>
            Finalizar e Enviar para Verificação
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const sectionTitleStyle = {
  fontSize: '1.4rem',
  fontWeight: '800',
  marginBottom: '24px',
  color: 'var(--text-main)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  paddingBottom: '12px',
  borderBottom: '2px solid var(--primary-light)'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '700',
  fontSize: '0.95rem'
};

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '12px',
  border: '1px solid var(--border)',
  background: '#f8fafc',
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'all 0.2s ease'
};

const grid2Style = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  marginBottom: '20px'
};

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.9rem',
  fontWeight: '600',
  cursor: 'pointer'
};

export default ProviderForm;
