export enum Role {
  Admin = 'admin',
  Employee = 'employee',
  Default = '',
}

export function getRoutePermissionsByRole(role: Role) {
  const permissions = {
    [Role.Admin]: {
      permittedRoutes: ['/admin', '/employee'],
      whenNotPermitedRedirectTo: '/admin',
    } as Permission,
    [Role.Employee]: {
      permittedRoutes: ['/employee'],
      whenNotPermitedRedirectTo: '/employee',
    } as Permission,
    [Role.Default]: {
      permittedRoutes: ['/'],
      whenNotPermitedRedirectTo: '/',
    } as Permission,
  };

  const permission = permissions[role];

  return permission;
}

export interface Permission {
  permittedRoutes: string[];
  whenNotPermitedRedirectTo: string;
}

enum Action {
  Delete,
  Upload,
  Create,
}
