
export const rootPaths = {
  root: '/',
  errorsRoot: 'errors',
  dashboardRoot: 'dashboard',
  pagesRoot: 'pages',
  userRoot: 'user',
  authRoot: 'authentication',
  
};

export default {
  error404: `/${rootPaths.errorsRoot}/404`,
  error500: `/${rootPaths.errorsRoot}/500`,
  login: `/${rootPaths.authRoot}/login`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  list: `/${rootPaths.pagesRoot}/list`,
  userProfile: `/${rootPaths.userRoot}/profile`,

};
