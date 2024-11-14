import { inject, Injectable } from '@angular/core';
import { UserDto, usersStore } from '@data-access/users';

@Injectable()
export class GameService {
  private readonly userStore = inject(usersStore);

  public getUser(): UserDto {
    return this.userStore.user();
  }
}
