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
    // Atualizar o estado e armazenar tokens com base na configuração de salvar tokens
    set((state) => {
      const newTokens = { ...state.tokens, ...tokens };

      if (state.saveTokens) {
        // Se saveTokens é true, salve ou atualize os tokens no SecureStore
        if (newTokens.accessToken) {
          saveSecureData('tokens', JSON.stringify({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken || state.tokens?.refreshToken // Atualiza o refreshToken
          }));
        } else {
          // Se accessToken não está presente, remova os tokens
          deleteSecureData('tokens');
          return { tokens: null };
        }
      } else {
        // Se saveTokens é false, salve ou atualize os tokens apenas no estado
        if (newTokens.accessToken) {
          // Armazena temporariamente no estado
          set({ tokens: {
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken || state.tokens?.refreshToken
          } });
        } else {
          // Se accessToken não está presente, remova os tokens
          set({ tokens: null });
        }
      }
      
      return { tokens: newTokens };
    });
  },  
  setSaveTokens: async (save) => {
    set((state) => {
      if (!save && state.tokens) {
        // Se a configuração de salvar tokens for desativada e tokens existem, remova os tokens do SecureStore
        deleteSecureData('tokens');
      }
      // Atualize o estado com a nova configuração de salvar tokens
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
