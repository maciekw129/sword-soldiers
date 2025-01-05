import { JwtPayload } from 'jwt-decode';

export interface UserDto {
  id: string;
  name: string;
  gender: Gender;
  character: Character;
}

export interface CreateUserDto {
  name: string;
  gender: Gender;
  character: Character;
}

export const enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export const enum Character {
  KNIGHT = 1,
  ELF = 2,
  DWARF = 3,
}

export interface TokenPayload extends JwtPayload {
  permissions: Permission[];
}

export const enum Permission {
  EDIT_CONTENT = 'edit:content',
  CREATE_GAME_MAPS = 'create:game-maps',
}

export interface UserState {
  user: UserDto | null;
  permissions: Permission[];
}
