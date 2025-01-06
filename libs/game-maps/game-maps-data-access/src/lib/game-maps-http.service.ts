import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiProtected } from '../../../../data-access/src/lib';
import { Observable } from 'rxjs';
import { CreateGameMapDto, GameMapDto } from './game-maps-http.model';

@Injectable({ providedIn: 'root' })
export class GameMapsHttpService {
  private readonly http = inject(HttpClient);

  private readonly endpointBase = `${apiProtected}/game-maps`;

  public getAllGameMaps$(): Observable<GameMapDto[]> {
    return this.http.get<GameMapDto[]>(`${this.endpointBase}`);
  }

  public createGameMap$(body: CreateGameMapDto): Observable<GameMapDto> {
    return this.http.post<GameMapDto>(`${this.endpointBase}`, body);
  }
}
