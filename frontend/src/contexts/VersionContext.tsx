import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type VersionType = 'modern' | 'traditional';

interface VersionContextType {
  version: VersionType;
  setVersion: (version: VersionType) => void;
  toggleVersion: () => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<VersionType>(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('siteVersion');
    return (saved as VersionType) || 'modern';
  });

  useEffect(() => {
    localStorage.setItem('siteVersion', version);
  }, [version]);

  const toggleVersion = () => {
    setVersion(prev => prev === 'modern' ? 'traditional' : 'modern');
  };

  return (
    <VersionContext.Provider value={{ version, setVersion, toggleVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
}
