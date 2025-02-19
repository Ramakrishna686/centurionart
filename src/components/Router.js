import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRoute } from '../contexts/RouteContext';

const Router = () => {
  const { routes } = useRoute();

  return (
    <Routes>
      {routes.map(({ path, component: Component, guard: Guard }) => (
        <Route
          key={path}
          path={path}
          element={
            Guard ? (
              <Guard>
                <Component />
              </Guard>
            ) : (
              <Component />
            )
          }
        />
      ))}
    </Routes>
  );
};

export default Router;