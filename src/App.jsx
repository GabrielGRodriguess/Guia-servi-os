import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CitySelector from './components/CitySelector';
import ServiceChips from './components/ServiceChips';
import ProviderCard from './components/ProviderCard';
import ProviderProfile from './components/ProviderProfile';
import EmptySearchState from './components/EmptySearchState';
import ProviderForm from './components/ProviderForm';
import AdminPanel from './components/AdminPanel';
import { LoginModal, HowItWorksModal } from './components/Modals';
import { initialProviders } from './data/providers';
import { getProviders, addProvider, updateProvider, deleteProviderPermanently } from './utils/storage';
import { Award, Users, Star, Clock } from 'lucide-react';
import './index.css';

function App() {
  const [view, setView] = useState('home');
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [editingProvider, setEditingProvider] = useState(null);
  const [providers, setProviders] = useState([]);
  const [initialFormService, setInitialFormService] = useState('');
  const [filter, setFilter] = useState('all'); // all, etec, top_rated, today
  
  // Modal states
  const [showLogin, setShowLogin] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Load providers from storage on mount
  useEffect(() => {
    const storedProviders = getProviders(initialProviders);
    setProviders(storedProviders);
  }, []);

  // 1. Get providers for the selected city
  const cityProviders = useMemo(() => {
    if (!selectedCity) return [];
    
    // Normalize city for comparison
    const normalize = (str) => str.toLowerCase().trim();
    const normalizedSelectedCity = normalize(selectedCity);

    return providers.filter(p => normalize(p.city) === normalizedSelectedCity);
  }, [selectedCity, providers]);

  // 2. Get unique available services in the selected city for the chips
  const availableServices = useMemo(() => {
    if (!selectedCity) return [];
    const services = cityProviders.map(p => p.category);
    return [...new Set(services)];
  }, [cityProviders, selectedCity]);

  // 3. Final filtered providers list
  const filteredProviders = useMemo(() => {
    if (!selectedCity) return [];
    
    return cityProviders.filter(provider => {
      // Public view: only show active providers
      if (provider.provider_status && provider.provider_status !== 'active') return false;
      
      if (provider.status && provider.status !== 'approved') return false;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        provider.name.toLowerCase().includes(searchLower) ||
        provider.category.toLowerCase().includes(searchLower) ||
        provider.neighborhood.toLowerCase().includes(searchLower) ||
        provider.shortDescription.toLowerCase().includes(searchLower) ||
        (provider.services && provider.services.some(s => s.toLowerCase().includes(searchLower)));
      
      const matchesChip = !selectedService || provider.category === selectedService;

      // Filter logic
      if (filter === 'etec' && !provider.is_etec) return false;
      if (filter === 'top_rated' && provider.rating < 4.8) return false;
      // 'today' filter is just a placeholder for now as we don't have real-time availability
      
      return matchesSearch && matchesChip;
    });
  }, [cityProviders, searchTerm, selectedService, selectedCity, filter]);

  // Split filtered providers into ETEC and Others
  const etecProviders = useMemo(() => filteredProviders.filter(p => p.is_etec), [filteredProviders]);
  const otherProviders = useMemo(() => filteredProviders.filter(p => !p.is_etec), [filteredProviders]);

  const handleSelectProvider = (provider) => {
    setSelectedProvider(provider);
    setView('profile');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProvider(null);
  };

  const handleRegisterService = (service = '') => {
    setInitialFormService(service);
    setView('register');
  };

  const handleAddProvider = (newProvider) => {
    // New providers start as 'pending' for admin review
    const providerWithStatus = { ...newProvider, provider_status: 'pending' };
    const updatedProviders = addProvider(providerWithStatus);
    setProviders(updatedProviders);
  };

  const handleUpdateProvider = (updatedProvider) => {
    const updatedProviders = updateProvider(updatedProvider);
    setProviders(updatedProviders);
  };

  const handleDeleteProvider = (providerId) => {
    const updatedProviders = deleteProviderPermanently(providerId);
    setProviders(updatedProviders);
  };

  const handleEditProvider = (provider) => {
    setEditingProvider(provider);
    setView('edit');
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <Header 
        onNavigate={(v) => v === 'home' ? handleBackToHome() : setView(v)} 
        onOpenLogin={() => setShowLogin(true)}
        onOpenHowItWorks={() => setShowHowItWorks(true)}
      />
      
      <main>
        {view === 'home' && (
          <div className="animate-fade">
            <section className="hero-section-v2">
              <div className="container">
                <div className="red-detail-line"></div>
                <h1 className="hero-title-v2">
                  Serviços técnicos da região
                </h1>
                <p className="hero-subtitle-v2">
                  Profissionais da sua cidade, com destaque para alunos e ex-alunos ETEC.
                </p>
                
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px' }}>
                  <button className="btn-primary btn-etec" onClick={() => { setFilter('etec'); setSelectedService(null); }}>
                    Ver profissionais ETEC
                  </button>
                  <button className="btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => { setFilter('all'); setSelectedService(null); }}>
                    Ver todos os prestadores
                  </button>
                </div>

                <div className="secondary-banner" style={{ marginBottom: '40px', fontSize: '0.9rem', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Rede técnica com vínculo educacional
                </div>
                
                <div className="hero-controls">
                  <CitySelector 
                    selectedCity={selectedCity} 
                    onSelectCity={(city) => {
                      setSelectedCity(city);
                      setSelectedService(null);
                      setSearchTerm('');
                    }} 
                  />
                  
                  <div className={`search-wrapper ${!selectedCity ? 'disabled' : ''}`}>
                    <SearchBar 
                      value={searchTerm} 
                      onChange={setSearchTerm} 
                      disabled={!selectedCity}
                      providers={providers}
                    />
                    {!selectedCity && (
                      <span className="search-hint">Selecione uma cidade para buscar profissionais</span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="container">
              {!selectedCity ? (
                <div className="select-city-prompt">
                  <div className="prompt-icon">📍</div>
                  <h2>Selecione uma cidade para encontrar profissionais técnicos.</h2>
                  <p>Guararapes, Valparaíso, Rubiácea, Birigui, Araçatuba, Bento de Abreu e Bauru.</p>
                </div>
              ) : (
                <>
                  <div className="filters-bar" style={{ marginTop: '40px' }}>
                    <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                      Todos
                    </button>
                    <button className={`filter-btn ${filter === 'etec' ? 'active' : ''}`} onClick={() => setFilter('etec')}>
                      <Award size={16} /> Somente ETEC
                    </button>
                    <button className={`filter-btn ${filter === 'top_rated' ? 'active' : ''}`} onClick={() => setFilter('top_rated')}>
                      <Star size={16} /> Mais avaliados
                    </button>
                    <button className={`filter-btn ${filter === 'today' ? 'active' : ''}`} onClick={() => setFilter('today')}>
                      <Clock size={16} /> Disponíveis hoje
                    </button>
                  </div>

                  <ServiceChips 
                    services={availableServices}
                    selectedService={selectedService}
                    onSelectService={(s) => {
                      setSelectedService(s);
                      setSearchTerm('');
                    }}
                  />

                  {/* ETEC Professionals Section */}
                  {(filter === 'all' || filter === 'etec') && (
                    <section className="results-section">
                      <div className="section-divider">
                        <Award size={24} color="var(--primary)" />
                        <h2>Profissionais ETEC em destaque</h2>
                        <div className="line"></div>
                      </div>

                      {etecProviders.length > 0 ? (
                        <div className="etec-highlight-grid">
                          {etecProviders.map(p => (
                            <ProviderCard key={p.id} provider={p} onSelect={handleSelectProvider} />
                          ))}
                        </div>
                      ) : (
                        <div className="empty-etec-state">
                          <h4>Ainda não há profissionais ETEC cadastrados nesta cidade.</h4>
                          <p>Veja todos os prestadores disponíveis logo abaixo.</p>
                        </div>
                      )}
                    </section>
                  )}

                  {/* Other Professionals Section */}
                  {filter !== 'etec' && (
                    <section className="results-section" style={{ marginTop: '60px' }}>
                      <div className="section-divider">
                        <Users size={24} color="var(--secondary)" />
                        <h2>Outros prestadores da cidade</h2>
                        <div className="line"></div>
                      </div>

                      {otherProviders.length > 0 ? (
                        <div className="provider-grid">
                          {otherProviders.map(p => (
                            <ProviderCard key={p.id} provider={p} onSelect={handleSelectProvider} />
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                          <p>Nenhum outro prestador encontrado com os filtros atuais.</p>
                        </div>
                      )}
                    </section>
                  )}

                  {searchTerm && filteredProviders.length === 0 && (
                    <EmptySearchState 
                      searchTerm={searchTerm} 
                      onRegisterService={handleRegisterService}
                      onRequestService={(s) => alert(`Demanda para ${s} em ${selectedCity} registrada!`)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {view === 'profile' && selectedProvider && (
          <ProviderProfile provider={selectedProvider} onBack={handleBackToHome} />
        )}

        {view === 'register' && (
          <ProviderForm 
            initialService={initialFormService}
            onBack={handleBackToHome}
            onSubmit={handleAddProvider}
          />
        )}

        {view === 'admin' && (
          <AdminPanel 
            providers={providers}
            onUpdateProvider={handleUpdateProvider}
            onDeleteProvider={handleDeleteProvider}
            onEditProvider={handleEditProvider}
            onBack={handleBackToHome}
          />
        )}

        {view === 'edit' && editingProvider && (
          <ProviderForm 
            initialData={editingProvider}
            onBack={() => setView('admin')}
            onSubmit={(updated) => {
              handleUpdateProvider(updated);
              setView('admin');
            }}
          />
        )}
      </main>

      <footer className="footer-v2">
        <div className="container footer-content">
          <div className="logo">
            <h1>Guia<span>Serviços</span></h1>
          </div>
          <div className="footer-links">
            <a href="#">Privacidade</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Ajuda</a>
          </div>
          <p>© 2026 Guia Serviços • Marketplace Local</p>
          <p style={{ fontSize: '0.8rem', opacity: 0.7, maxWidth: '600px', textAlign: 'center', marginTop: '10px' }}>
            Plataforma independente com destaque para profissionais técnicos e estudantes da ETEC. 
            O vínculo é informado pelo prestador e sujeito à verificação manual. 
            Não possuímos parceria oficial com o Centro Paula Souza ou unidades ETEC.
          </p>
        </div>
      </footer>

      {/* Global Modals */}
      <AnimatePresence>
        {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
        {showHowItWorks && <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
