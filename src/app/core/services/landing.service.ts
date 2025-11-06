import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { ObtenerTipoProductoMenuLandingResponse } from '../models/Landing/ObtenerTipoProductoMenuLanding/ObtenerTipoProductoMenuLandingResponse';
import { map, Observable } from 'rxjs';
import { EnviarCorreoConsultaResponse } from '../models/Landing/EnviarCorreoConsulta/EnviarCorreoConsultaResponse';
import { EnviarCorreoConsultaRequest } from '../models/Landing/EnviarCorreoConsulta/EnviarCorreoConsultaRequest';
import { ObtenerTipoProductoLandingResponse } from '../models/Landing/ObtenerTipoProductoLanding/ObtenerTipoProductoLandingResponse';
import { ObtenerCategoriaLandingResponse } from '../models/Landing/ObtenerCategoriaLanding/ObtenerCategoriaLandingResponse';

@Injectable({
  providedIn: 'root'
})
export class LandingService extends Api {

  ObtenerTipoProductoLandingMenu(): Observable<Array<ObtenerTipoProductoMenuLandingResponse>> {
    const uri = `${this.url}Landing/obtenerTipoProductoMenuLanding`;
    return this.http.get<Array<ObtenerTipoProductoMenuLandingResponse>>(uri);
  }

  EnviarCorreoConsulta(request: EnviarCorreoConsultaRequest): Observable<EnviarCorreoConsultaResponse> {
    const uri = `${this.url}Landing/enviarCorreoConsulta`;
    return this.http.post<EnviarCorreoConsultaResponse>(uri, request);
  }

  ObtenerTipoProductoLanding(id: number): Observable<ObtenerTipoProductoLandingResponse> {
    const uri = `${this.url}Landing/obtenerTipoProductoLanding/${id}`;
    return this.http.get<ObtenerTipoProductoLandingResponse>(uri);
  }

  ObtenerCategoriaLanding(idTipoProducto: number, idCategoria: number): Observable<ObtenerCategoriaLandingResponse> {
    const uri = `${this.url}Landing/obtenerTipoProductoLanding/${idTipoProducto}/categoria/${idCategoria}`;
    return this.http.get<ObtenerCategoriaLandingResponse>(uri);
  }
}
