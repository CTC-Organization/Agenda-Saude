import { create } from 'zustand';
import {
  deleteData as deleteAsyncData,
  getData as getAsyncData,
  saveData as saveAsyncData
} from './asyncStore';
import {
  deleteData as deleteSecureData,
  getData as getSecureData,
  saveData as saveSecureData
} from './secureStore';

interface UserState {
  user: {
    userId?: string;
    id?: string;
    name?: string;
    birthDate?: string;
    susNumber?: string;
    phoneNumber?: string;
    email?: string;
    avatarUrl?: string;
  } | null;
  tokens: {
    accessToken?: string;
    refreshToken?: string;
  } | null;
  saveTokens: boolean;
  theme: 'light' | 'dark';
  setUser: (user: Partial<UserState['user']>) => void;
  setTokens: (tokens: Partial<UserState['tokens']>) => void;
  setSaveTokens: (save: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  loadStore: () => Promise<void>;
  clearStore: () => Promise<void>;
}

const validateTheme = (theme: any): 'light' | 'dark' => {
  return theme === 'dark' ? 'dark' : 'light';
};

const useUserStore = create<UserState>((set) => ({
  user: null,
  tokens: null,
  saveTokens: false,
  theme: 'light',
  setUser: async (user) => {
    // Atualizar o estado e salvar os dados no SecureStore
    set((state) => {
      const updatedUser = { ...state.user, ...user };
      saveSecureData('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
  setTokens: async (tokens) => {
    // Atualizar o estado e salvar os tokens no SecureStore
    set((state) => {
      const newTokens = { ...state.tokens, ...tokens };
      if (newTokens) {
        if (newTokens.accessToken) {
          saveSecureData('tokens', JSON.stringify({ accessToken: newTokens.accessToken }));
        } else {
          deleteSecureData('tokens');
          return { tokens: null };
        }
        if (state.saveTokens && newTokens.refreshToken) {
          saveSecureData('tokens', JSON.stringify({ 
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken }));
        }
        return { tokens: newTokens };
      }
      deleteSecureData('tokens');
      return { tokens: null };
    });
  },
  setSaveTokens: async (save) => {
    // Atualizar o estado para indicar se os tokens devem ser salvos
    set((state) => {
      // Se a configuração de salvar tokens foi alterada para falso
      if (!save && state.tokens) {
        deleteSecureData('tokens');
      }
      return { saveTokens: save };
    });
  },
  setTheme: async (theme) => {
    // Atualizar o estado e salvar o tema no AsyncStorage
    set({ theme });
    await saveAsyncData('theme', theme);
  },
  loadStore: async () => {
    // Carregar dados do AsyncStorage e SecureStore e definir o estado
    const userData = await getSecureData('user');
    const tokenData = await getSecureData('tokens');
    const themeData = await getAsyncData('theme');
    set({
      user: userData ? JSON.parse(userData) : null,
      tokens: tokenData ? JSON.parse(tokenData) : null,
      theme: validateTheme(themeData),
    });
  },
  clearStore: async () => {
    // Limpar AsyncStorage e SecureStore e redefinir o estado
    await deleteSecureData('user');
    await deleteSecureData('tokens');
    await deleteAsyncData('theme');
    set({ user: null, tokens: null, theme: 'light' });
  }
}));

export { useUserStore };
