import { Permission } from '@data-access/users';

export class UserUtils {
  public static hasAnyPermission(
    userPermissions: Permission[],
    requiredPermissions: Permission[]
  ): boolean {
    return userPermissions.some((permission) =>
      requiredPermissions.includes(permission)
    );
  }
}
