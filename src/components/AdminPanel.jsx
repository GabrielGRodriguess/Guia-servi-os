import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Filter, CheckCircle, XCircle, EyeOff, Lock, Trash2, 
  Award, ShieldCheck, MoreVertical, MapPin, Briefcase, Calendar, MessageCircle, AlertTriangle, Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = ({ providers, onUpdateProvider, onDeleteProvider, onEditProvider, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: 'Todas',
    category: 'Todas',
    etecOnly: 'all', // all, etec, common
    status: 'all' // all, active, pending, hidden, blocked, deleted
  });

  const [modal, setModal] = useState({ show: false, type: '', provider: null, reason: '' });
  const [confirmText, setConfirmText] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  // Filter logic
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = filters.city === 'Todas' || p.city === filters.city;
      const matchesCategory = filters.category === 'Todas' || p.category === filters.category;
      
      const matchesEtec = filters.etecOnly === 'all' || 
                         (filters.etecOnly === 'etec' && p.is_etec) || 
                         (filters.etecOnly === 'common' && !p.is_etec);
      
      const matchesStatus = filters.status === 'all' || 
                           (filters.status === 'pending_verif' ? (p.is_etec && p.etec_status === 'informed') : p.provider_status === filters.status);

      return matchesSearch && matchesCity && matchesCategory && matchesEtec && matchesStatus;
    });
  }, [providers, searchTerm, filters]);

  const uniqueCities = ['Todas', ...new Set(providers.map(p => p.city))];
  const uniqueCategories = ['Todas', ...new Set(providers.map(p => p.category))];

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleAction = (type, provider) => {
    if (type === 'approve') {
      const updated = { ...provider, provider_status: 'active' };
      onUpdateProvider(updated);
      showToast('Prestador reativado e visível novamente.');
    } else if (type === 'verify_etec') {
      const updated = { ...provider, etec_status: 'verified' };
      onUpdateProvider(updated);
      showToast('Status ETEC atualizado para Verificado.');
    } else if (type === 'remove_etec') {
      const updated = { ...provider, etec_status: 'informed' };
      onUpdateProvider(updated);
      showToast('Selo de verificação ETEC removido.');
    } else {
      setModal({ show: true, type, provider, reason: '' });
    }
  };

  const confirmModalAction = () => {
    const { type, provider, reason } = modal;
    let updated = { ...provider };

    if (type === 'hide') {
      updated.provider_status = 'hidden';
      updated.removal_reason = reason;
      updated.removed_at = new Date().toISOString();
      onUpdateProvider(updated);
      showToast('Prestador ocultado da listagem pública com sucesso.');
    } else if (type === 'block') {
      updated.provider_status = 'blocked';
      updated.removal_reason = reason;
      updated.removed_at = new Date().toISOString();
      onUpdateProvider(updated);
      showToast('Prestador bloqueado com sucesso.');
    } else if (type === 'delete') {
      if (confirmText !== 'REMOVER') {
        alert('Por favor, digite REMOVER para confirmar.');
        return;
      }
      onDeleteProvider(provider.id);
      showToast('Prestador excluído permanentemente.');
    }

    setModal({ show: false, type: '', provider: null, reason: '' });
    setConfirmText('');
  };

  return (
    <div className="admin-panel animate-fade">
      <div className="container" style={{ padding: '40px 24px' }}>
        <div className="admin-header">
          <div>
            <h1>Painel Administrativo</h1>
            <p>Gerencie prestadores, verifique formações ETEC e controle a visibilidade da plataforma.</p>
          </div>
          <button className="btn-secondary" onClick={onBack}>Voltar ao App</button>
        </div>

        {/* Filters */}
        <section className="admin-filters-card">
          <div className="admin-search-bar">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou categoria..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="admin-filter-grid">
            <div className="filter-group">
              <label>Cidade</label>
              <select value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})}>
                {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Status Conta</label>
              <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
                <option value="all">Todos</option>
                <option value="active">Ativos</option>
                <option value="pending">Pendentes</option>
                <option value="hidden">Ocultos</option>
                <option value="blocked">Bloqueados</option>
                <option value="pending_verif">Pendentes de Verificação ETEC</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Vínculo ETEC</label>
              <select value={filters.etecOnly} onChange={(e) => setFilters({...filters, etecOnly: e.target.value})}>
                <option value="all">Todos</option>
                <option value="etec">Apenas ETEC</option>
                <option value="common">Apenas Comuns</option>
              </select>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <span className="stat-value">{providers.length}</span>
            <span className="stat-label">Total de Prestadores</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{providers.filter(p => p.provider_status === 'active').length}</span>
            <span className="stat-label">Ativos</span>
          </div>
          <div className="stat-card highlight" style={{ borderColor: 'var(--secondary)', background: '#eff6ff' }}>
            <span className="stat-value" style={{ color: 'var(--secondary)' }}>{providers.filter(p => p.provider_status === 'pending').length}</span>
            <span className="stat-label" style={{ color: 'var(--secondary)' }}>Pendentes de Aprovação</span>
          </div>
          <div className="stat-card highlight" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
            <span className="stat-value" style={{ color: 'var(--accent)' }}>{providers.filter(p => p.is_etec && p.etec_status === 'informed').length}</span>
            <span className="stat-label" style={{ color: 'var(--accent)' }}>Pendentes ETEC</span>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Prestador</th>
                <th>Cidade / Categoria</th>
                <th>Status ETEC</th>
                <th>Status Conta</th>
                <th>Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="td-provider">
                      <div className="td-avatar">{p.name.charAt(0)}</div>
                      <div className="td-info">
                        <strong>{p.name}</strong>
                        <span>{p.whatsapp}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="td-info">
                      <strong>{p.category}</strong>
                      <span>{p.city}</span>
                    </div>
                  </td>
                  <td>
                    {p.is_etec ? (
                      <span className={`badge-admin-etec ${p.etec_status}`}>
                        {p.etec_status === 'verified' ? 'Verificado' : 'Informado'}
                      </span>
                    ) : (
                      <span className="badge-admin-none">Nenhum</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge-status ${p.provider_status}`}>
                      {p.provider_status}
                    </span>
                  </td>
                  <td>
                    <div className="td-info">
                      <span>{p.createdAt || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button title="Editar" onClick={() => onEditProvider(p)}><Edit size={18} /></button>
                      {p.provider_status !== 'active' && (
                        <button title="Ativar" onClick={() => handleAction('approve', p)}><CheckCircle size={18} color="var(--success)" /></button>
                      )}
                      {p.is_etec && p.etec_status !== 'verified' && (
                        <button title="Verificar ETEC" onClick={() => handleAction('verify_etec', p)}><Award size={18} color="var(--primary)" /></button>
                      )}
                      {p.etec_status === 'verified' && (
                        <button title="Remover Selo ETEC" onClick={() => handleAction('remove_etec', p)}><Award size={18} color="var(--secondary)" /></button>
                      )}
                      {p.provider_status === 'active' && (
                        <button title="Ocultar" onClick={() => handleAction('hide', p)}><EyeOff size={18} /></button>
                      )}
                      {p.provider_status !== 'blocked' && (
                        <button title="Bloquear" onClick={() => handleAction('block', p)}><Lock size={18} color="var(--accent)" /></button>
                      )}
                      <button title="Excluir Permanente" onClick={() => handleAction('delete', p)}><Trash2 size={18} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProviders.length === 0 && (
            <div className="empty-table">Nenhum prestador encontrado com os filtros selecionados.</div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal.show && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header">
                {modal.type === 'delete' ? <AlertTriangle color="#ef4444" size={32} /> : <ShieldCheck color="var(--primary)" size={32} />}
                <h2>{modal.type === 'hide' ? 'Ocultar Prestador' : modal.type === 'block' ? 'Bloquear Prestador' : 'Excluir Permanentemente'}</h2>
              </div>
              
              <div className="modal-body">
                <p>
                  Tem certeza que deseja {modal.type === 'hide' ? 'ocultar' : modal.type === 'block' ? 'bloquear' : 'excluir'} 
                  o prestador <strong>{modal.provider?.name}</strong>?
                </p>

                {modal.type !== 'delete' && (
                  <div className="input-group" style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>Motivo:</label>
                    <select 
                      value={modal.reason} 
                      onChange={(e) => setModal({...modal, reason: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                    >
                      <option value="">Selecione um motivo...</option>
                      <option value="Dados falsos">Dados falsos</option>
                      <option value="Reclamação de usuário">Reclamação de usuário</option>
                      <option value="Prestador inativo">Prestador inativo</option>
                      <option value="Pedido do próprio prestador">Pedido do próprio prestador</option>
                      <option value="Fora das regras da plataforma">Fora das regras da plataforma</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                )}

                {modal.type === 'delete' && (
                  <div className="input-group" style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#ef4444' }}>
                      Esta ação é permanente. Digite REMOVER para confirmar:
                    </label>
                    <input 
                      type="text" 
                      placeholder="REMOVER" 
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #ef4444' }}
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setModal({ show: false, type: '', provider: null, reason: '' })}>Cancelar</button>
                <button 
                  className={modal.type === 'delete' ? 'btn-danger' : 'btn-primary'}
                  disabled={(modal.type !== 'delete' && !modal.reason) || (modal.type === 'delete' && confirmText !== 'REMOVER')}
                  onClick={confirmModalAction}
                >
                  {modal.type === 'hide' ? 'Ocultar Prestador' : modal.type === 'block' ? 'Bloquear Prestador' : 'Excluir Agora'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            className="admin-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <CheckCircle size={20} />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
