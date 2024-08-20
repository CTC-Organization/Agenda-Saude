import { refreshToken } from '@/app/api/tokenService';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const { tokens } = useUserStore.getState();

  // Adiciona o token de acesso no header, se disponível
  if (tokens?.accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    // Se a resposta for 401 (não autorizado), tenta atualizar o token
    if (response.status === 401) {
      if (!tokens?.refreshToken) {
        throw new Error('Refresh token não disponível');
      }

      // Atualiza o token
      const newTokens = await refreshToken(tokens.refreshToken);
      useUserStore.getState().setTokens(newTokens);

      // Repetir a requisição com o novo token
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newTokens.accessToken}`,
      };

      const retryResponse = await fetch(`${API_URL}${endpoint}`, options);

      if (!retryResponse.ok) {
        throw new Error('Resposta da rede não deu certo');
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      throw new Error('Resposta da rede não deu certo');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export { fetchWithAuth };
