import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiProtected } from '../data-access.const';
import { CreateUserDto, UserDto } from './users.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);

  private readonly endpointBase = `${apiProtected}/users`;

  public getCurrentUser$(): Observable<UserDto | null> {
    return this.http.get<UserDto>(`${this.endpointBase}/current`);
  }

  public updateUser$(id: string, body: Partial<UserDto>): Observable<UserDto> {
    return this.http.patch<UserDto>(`${this.endpointBase}/${id}`, body);
  }

  public createUser$(body: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.endpointBase, body);
  }
}