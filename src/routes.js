import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import MyOrders from './pages/MyOrders';
import MyInvitations from './pages/MyInvitations';
import Newbies from './pages/Newbies';
import MyNetwork from './pages/MyNetwork';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import ShoppingBag from './pages/ShoppingBag';
import Goods from './pages/Goods';
import DashboardApp from './pages/DashboardApp';
import MyOrdersItem from "./pages/MyOrdersItem";
import MyNetworksItem from './pages/MyNetworksItem';

// ----------------------------------------------------------------------

export default function Router(props) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout partnerId={props.partnerId} />,
      children: [
        { path: '', element: <DashboardApp /> },
      ],
    },
    {
      path: '/invitations',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <MyInvitations /> },
      ],
    },
    {
      path: '/newbies',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Newbies /> },
      ],
    },
    {
      path: '/network',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <MyNetwork partnerId={props.partnerId}  /> },
      ],
    },
    {
      path: '/network/:id',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <MyNetworksItem /> },
      ],
    },
    {
      path: '/products',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Goods /> },
      ],
    },
    {
      path: '/shopping-bag',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <ShoppingBag /> },
      ],
    },
    {
      path: '/my-orders',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <MyOrders /> },
      ],
    },
    {
    path: '/my-orders/:id',
      element: <DashboardLayout />,
      children: [
    { path: '', element: <MyOrdersItem /> },
  ],
},

{
      path: '/blog',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login partnerId={props.partnerId} setPartnerId={props.setPartnerId}/> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
