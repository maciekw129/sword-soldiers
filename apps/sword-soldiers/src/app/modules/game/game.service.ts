import { inject, Injectable } from '@angular/core';
import { UserDto, usersStore } from '@users/api';

@Injectable()
export class GameService {
  private readonly userStore = inject(usersStore);

  public getUser(): UserDto {
    return this.userStore.user();
  }
}
