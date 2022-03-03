import React, { createContext, ReactNode, useContext } from 'react';

const projectDataContext = createContext(null);

export const ProjectDataProvider = ({
  children,
  projectData,
  setProjectData,
}: {
  children: ReactNode;
  projectData: any;
  setProjectData: (object: any) => void;
}) => {
  return (
    <projectDataContext.Provider value={{ projectData, setProjectData }}>
      {children}
    </projectDataContext.Provider>
  );
};

export const useProjectData = () => {
  return useContext(projectDataContext);
};
