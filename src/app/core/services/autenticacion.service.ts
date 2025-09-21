import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { IniciarSesionRequest } from '../models/IniciarSesion/IniciarSesionRequest';
import { IniciarSesionResponse } from '../models/IniciarSesion/IniciarSesionResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService extends Api {

  IniciarSesion(usuarioLogin: IniciarSesionRequest): Observable<IniciarSesionResponse> {
    const uri = `${this.url}Autenticacion/iniciarSesion`;
    return this.http.post<IniciarSesionResponse>(uri, usuarioLogin);
  }

}
