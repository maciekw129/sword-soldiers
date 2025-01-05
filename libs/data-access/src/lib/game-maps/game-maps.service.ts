import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateGameMapDto, GameMapDto } from './game-maps.model';
import { apiProtected } from '../data-access.const';

@Injectable({ providedIn: 'root' })
export class GameMapsService {
  private readonly http = inject(HttpClient);

  private readonly endpointBase = `${apiProtected}/game-maps`;

  public getAllGameMaps$(): Observable<GameMapDto[]> {
    return this.http.get<GameMapDto[]>(`${this.endpointBase}`);
  }

  public createGameMap$(body: CreateGameMapDto): Observable<GameMapDto> {
    return this.http.post<GameMapDto>(`${this.endpointBase}`, body);
  }
}
