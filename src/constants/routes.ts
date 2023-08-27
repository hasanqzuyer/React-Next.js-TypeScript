export const CProtectedRoutes = [
  '/',
  '/account',
  '/opportunities',
  '/applications',
  '/users',
  '/users/overview',
  '/houses',
  '/finance',
  '/help',
  '/houses/overview',
];

export const CUnprotectedRoutes = [
  '/login',
  '/register',
  '/reset-password',
  '/email-confirmation',
];

export const CProtectedDynamicRoutes = ['users/overview/'];

export const CMiscRoutes = ['/_/code'];

export const CAllRoutes = [
  ...CProtectedRoutes,
  ...CUnprotectedRoutes,
  ...CMiscRoutes,
];
