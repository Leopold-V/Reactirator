import React, { createContext, ReactNode, useContext, useState } from 'react';

const LoadingContext = createContext(null);

export const LoadingPackageProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  return { loading, setLoading };
};
