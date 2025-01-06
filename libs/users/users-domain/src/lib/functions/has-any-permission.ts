import { Permission } from '@users/data-access';

export const hasAnyPermission = (
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean => {
  return userPermissions.some((permission) =>
    requiredPermissions.includes(permission)
  );
};
