import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserDto, UserState, Permission } from './users.model';

const initialState: UserState = {
  user: null,
  permissions: [],
};

export const usersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setUser(user: UserDto | null): void {
      patchState(store, (state) => ({ ...state, user }));
    },
    setPermissions(permissions: Permission[]): void {
      patchState(store, (state) => ({ ...state, permissions }));
    },
  }))
);

export type UsersStore = InstanceType<typeof usersStore>;
