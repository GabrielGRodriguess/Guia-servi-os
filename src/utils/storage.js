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
