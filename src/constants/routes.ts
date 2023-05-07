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
  '/search',
  '/sml',
  '/services/campaigns',
  '/services/campaigns/inpreparation',
  '/services/campaigns/ongoing',
  '/services/reports',
  '/services/reports/finished',
  '/services/sml',
  '/services/sml/reports',
  '/services/surveys',
  '/services/surveys/create',
  '/services/benefits',
  '/surveys',
  '/surveys/create',
];

export const CUnprotectedRoutes = [
  '/login',
  '/register',
  '/reset-password',
  '/email-confirmation',
];

export const CAllRoutes = [...CProtectedRoutes, ...CUnprotectedRoutes];
