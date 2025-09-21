import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { Observable } from 'rxjs';
import { IniciarSesionResponse } from '../models/IniciarSesion/IniciarSesionResponse';
import { ObtenerMenuRequest } from '../models/ObtenerMenu/ObtenerMenuRequest';
import { ObtenerMenuResponse } from '../models/ObtenerMenu/ObtenerMenuResponse';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService extends Api {

  ObtenerMenu(menuRequest: ObtenerMenuRequest): Observable<Array<ObtenerMenuResponse>> {
    const uri = `${this.url}Autorizacion/obtenerMenu`;
    return this.http.post<Array<ObtenerMenuResponse>>(uri, menuRequest, { headers: this._headers });
  }
}
