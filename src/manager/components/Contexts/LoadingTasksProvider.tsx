import React, { createContext, ReactNode, useContext, useState } from 'react';

const LoadingTasksContext = createContext(null);

export const LoadingTasksProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingTasksContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingTasksContext.Provider>
  );
};

export const useLoadingTasks = () => {
  const { loading, setLoading } = useContext(LoadingTasksContext);

  return { loading, setLoading };
};
