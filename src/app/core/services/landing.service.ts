import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { ObtenerTipoProductoMenuLandingResponse } from '../models/Landing/ObtenerTipoProductoMenuLanding/ObtenerTipoProductoMenuLandingResponse';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService extends Api {

  ObtenerTipoProductoLandingMenu(): Observable<Array<ObtenerTipoProductoMenuLandingResponse>> {
    const uri = `${this.url}Landing/obtenerTipoProductoMenuLanding`;
    return this.http.get<Array<ObtenerTipoProductoMenuLandingResponse>>(uri);
  }

}
