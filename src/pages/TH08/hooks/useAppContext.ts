import { useContext } from 'react';
import { AppContext, AppContextValue } from '../context/AppContext';

const useAppContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext phải được dùng bên trong <AppProvider>');
  }
  return ctx;
};

export default useAppContext;