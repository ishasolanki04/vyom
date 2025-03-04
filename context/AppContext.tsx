import { createContext, useContext, ReactNode, useState } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  notifications: number;
  setNotifications: (count: number) => void;
  userPreferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
  updateUserPreferences: (preferences: Partial<AppContextType['userPreferences']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateUserPreferences = (preferences: Partial<AppContextType['userPreferences']>) => {
    setUserPreferences(prev => ({ ...prev, ...preferences }));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        notifications,
        setNotifications,
        userPreferences,
        updateUserPreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 