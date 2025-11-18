import { useContext } from 'react';
import AppContext, { AppContextType } from '../AppContext';

export const useAppContext = () => {
    const context = useContext<AppContextType>(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext hook must be used within a AppProvider');
    }
    return context;
};

export default useAppContext;
