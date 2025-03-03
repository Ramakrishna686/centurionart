import Dashboard from '../pages/Dashboard';
import LoginComponent from '../pages/LoginComponent';
import RegistrationComponent from '../pages/RegisterComponent';
import BuyerDashboard from '../pages/BuyerDashboard';
import VendorDashboard from '../pages/VendorDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import ArtGalleryLanding from '../pages/LandingPage';
import Unauthorized from '../pages/Unauthorized';
import { AuthGuard } from '../guards/AuthGuard';
import { RoleGuard } from '../guards/RoleGuard';

export const routes = [
  {
    path: '/',
    name: 'Landing',
    component: ArtGalleryLanding
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationComponent,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    guard: AuthGuard
  },
  {
    path: '/buyer-dashboard',
    name: 'Buyer Dashboard',
    component: BuyerDashboard,
    guard: (props) => <RoleGuard {...props} roles={['buyer']} />
  },
  {
    path: '/vendor-dashboard',
    name: 'Vendor Dashboard',
    component: VendorDashboard,
    guard: (props) => <RoleGuard {...props} roles={['vendor']} />
  },
  {
    path: '/admin-dashboard',
    name: 'Admin Dashboard',
    component: AdminDashboard,
    guard: (props) => <RoleGuard {...props} roles={['admin']} />
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  }
];