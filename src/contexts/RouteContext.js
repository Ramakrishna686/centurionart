import { createContext, useContext, useState } from 'react';

const RouteContext = createContext(undefined);

export const RouteProvider = ({ children, routes }) => {
  const [currentRoute, setCurrentRoute] = useState(routes[0].path);

  return (
    <RouteContext.Provider value={{ routes, currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};
