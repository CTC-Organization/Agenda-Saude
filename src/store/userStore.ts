import { create } from 'zustand';
import { deleteData, getData, saveData } from './secureStore';

interface UserState {
  user: {
    userId?:string;
    id?: string;
    name?: string;
    birthDate?: string;
    cpf?: string;
    susNumber?: string;
    phoneNumber?: string;
    email?: string;
  } | null;
  tokens: {
    accessToken?: string;
    refreshToken?: string;
  } | null;
  saveTokens: boolean;
  setUser: (user: Partial<UserState['user']>) => void;
  setTokens: (tokens: Partial<UserState['tokens']>) => void;
  setSaveTokens: (save: boolean) => void;
  loadStore: () => Promise<void>;
  clearStore: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    tokens: null,
    saveTokens: false,
    setUser: async (user) => {
      // Atualizar o estado e salvar os dados no Secure Store
      set((state) => {
        const updatedUser = { ...state.user, ...user };
        saveData('user', JSON.stringify(updatedUser));
        return { user: updatedUser };
      });
    },
    setTokens: async (tokens) => {
      // Atualizar o estado e salvar os tokens no Secure Store
      set((state) => {
        const newTokens = { ...state.tokens, ...tokens };
  
        if (newTokens) {
          // Sempre salva o accessToken se estiver presente
          if (newTokens.accessToken) {
            saveData('tokens', JSON.stringify({ accessToken: newTokens.accessToken }));
          } else {
            // Remove tokens se não houver accessToken
            deleteData('tokens');
            return { tokens: null };
          }
          // Só salva o refreshToken se saveTokens for true
          if (state.saveTokens && newTokens.refreshToken) {
            saveData('tokens', JSON.stringify({ accessToken: newTokens.accessToken, 
              refreshToken: newTokens.refreshToken }));
          }
          return { tokens: newTokens };
        }
        // Remove tokens se não houver accessToken e refreshToken
        deleteData('tokens');
        return { tokens: null };
      });
    },
    setSaveTokens: async (save) => {
      // Atualizar o estado para indicar se os tokens devem ser salvos
      set((state) => {
        if (!save) {
          deleteData('tokens');
        }
        return { saveTokens: save };
      });
    },
    loadStore: async () => {
      // Carregar dados do Secure Store e definir o estado
      const userData = await getData('user');
      const tokenData = await getData('tokens');
      set({
        user: userData ? JSON.parse(userData) : null,
        tokens: tokenData ? JSON.parse(tokenData) : null,
      });
    },
    clearStore: async () => {
      // Limpar o Secure Store e redefinir o estado
      await deleteData('user');
      await deleteData('tokens');
      set({ user: null, tokens: null });
    }
  }));

export { useUserStore };
