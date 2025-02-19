import { BrowserRouter } from 'react-router-dom';
import { RouteProvider } from './contexts/RouteContext';
import { routes } from './config/routes';
import Router from './components/Router';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <RouteProvider routes={routes}>
        <div className="App">
          <Navigation />
          <Router />
        </div>
      </RouteProvider>
    </BrowserRouter>
  );
}

export default App;