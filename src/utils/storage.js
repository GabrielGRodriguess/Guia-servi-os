const PROVIDERS_KEY = 'guia_servicos_providers';

export const saveProviders = (providers) => {
  localStorage.setItem(PROVIDERS_KEY, JSON.stringify(providers));
};

export const getProviders = (initialData = []) => {
  const stored = localStorage.getItem(PROVIDERS_KEY);
  if (!stored) {
    saveProviders(initialData);
    return initialData;
  }
  return JSON.parse(stored);
};

export const addProvider = (provider) => {
  const providers = getProviders();
  const newProviders = [provider, ...providers];
  saveProviders(newProviders);
  return newProviders;
};

export const updateProvider = (updatedProvider) => {
  const providers = getProviders();
  const newProviders = providers.map(p => p.id === updatedProvider.id ? updatedProvider : p);
  saveProviders(newProviders);
  return newProviders;
};

export const deleteProviderPermanently = (providerId) => {
  const providers = getProviders();
  const newProviders = providers.filter(p => p.id !== providerId);
  saveProviders(newProviders);
  return newProviders;
};
