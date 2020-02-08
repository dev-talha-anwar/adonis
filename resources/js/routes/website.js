import Index from '@/components/website/index'
import Login from '@/components/website/auth/login'
import Register from '@/components/website/auth/register'
import ForgotPassword from '@/components/website/auth/forgotpassword'
import ResetPassword from '@/components/website/auth/resetpassword'


export default [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'showLoginForm',
    component: Login
  },
  {
    path: '/register',
    name: 'showRegisterForm',
    component: Register
  },
  {
    path: '/forgot/password',
    name: 'forgot.password',
    component: ForgotPassword
  },
  {
    path: '/reset/password',
    name: 'reset.password',
    component: ResetPassword
  }
];
