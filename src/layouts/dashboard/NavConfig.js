// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Главная',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  // {
  //   title: 'Мои заявки',
  //   path: '/invitations',
  //   icon: getIcon('eva:paper-plane-fill'),
  // },
  // {
  //   title: 'Мои новички',
  //   path: '/newbies',
  //   icon: getIcon('eva:people-fill'),
  // },
  {
    title: 'Моя сеть',
    path: '/network',
    icon: getIcon('eva:globe-fill'),
  },
  {
    title: 'Товары',
    path: '/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Корзина',
    path: '/shopping-bag',
    icon: getIcon('eva:shopping-cart-fill'),
  },
  {
    title: 'Мои заказы',
    path: '/my-orders',
    icon: getIcon('eva:car-fill'),
  },
  {
    title: 'Акции',
    path: '/blog',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default navConfig;
