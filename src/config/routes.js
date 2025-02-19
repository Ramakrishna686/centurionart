import Dashboard from '../pages/Dashboard';
import LoginComponent from '../pages/LoginComponent';
import RegistrationComponent from '../pages/RegisterComponent';
import { AuthGuard } from '../guards/AuthGuard';

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/regstration',
    name: 'Registration',
    component: RegistrationComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    guard: AuthGuard
  }
];