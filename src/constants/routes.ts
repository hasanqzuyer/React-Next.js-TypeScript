export const CProtectedRoutes = [
  '/',
  '/account',
  '/benefits',
  '/campaigns',
  '/clients',
  '/discover/clients',
  '/discover/influencers',
  '/users/clients',
  '/users/ambassadors',
  '/users/influencers',
  '/finance',
  '/help',
  '/income',
  '/reports',
  '/reports/finished',
  '/search',
  '/sml',
  '/sml/reports',
  '/surveys',
  '/surveys/create',
];

export const CUnprotectedRoutes = ['/login', '/register', '/change-password'];

export const CAllRoutes = [...CProtectedRoutes, ...CUnprotectedRoutes];
