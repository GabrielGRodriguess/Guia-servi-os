import { supabase } from './supabase';

// Helper: If supabase is not configured, throw an error
const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase não está configurado. Por favor, adicione VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY nas variáveis de ambiente.');
  }
};

export const getProviders = async () => {
  checkSupabase();
  
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .order('createdAt', { ascending: false });
    
  if (error) {
    console.error('Erro ao buscar prestadores:', error);
    throw new Error('Falha ao carregar a lista de prestadores.');
  }
  
  return data || [];
};

export const addProvider = async (provider) => {
  checkSupabase();
  
  const { data, error } = await supabase
    .from('providers')
    .insert([provider])
    .select();
    
  if (error) {
    console.error('Erro ao salvar prestador:', error);
    throw new Error('Não foi possível salvar o prestador. Tente novamente.');
  }
  
  return data[0];
};

export const updateProvider = async (updatedProvider) => {
  checkSupabase();
  
  const { data, error } = await supabase
    .from('providers')
    .update(updatedProvider)
    .eq('id', updatedProvider.id)
    .select();
    
  if (error) {
    console.error('Erro ao atualizar prestador:', error);
    throw new Error('Não foi possível atualizar o prestador.');
  }
  
  return data[0];
};

export const deleteProviderPermanently = async (providerId) => {
  checkSupabase();
  
  const { error } = await supabase
    .from('providers')
    .delete()
    .eq('id', providerId);
    
  if (error) {
    console.error('Erro ao deletar prestador:', error);
    throw new Error('Não foi possível excluir o prestador.');
  }
  
  return true;
};
