import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { AgregarTipoProductoRequest } from '../models/TipoProducto/AgregarTipoProducto/AgregarTipoProductoRequest';
import { AgregarTipoProductoResponse } from '../models/TipoProducto/AgregarTipoProducto/AgregarTipoProductoResponse';
import { Observable } from 'rxjs';
import { ObtenerTipoProductoRequest } from '../models/TipoProducto/ObtenerTipoProducto/ObtenerTipoProductoRequest';
import { EditarEstadoTipoProductoResponse } from '../models/TipoProducto/EditarEstadoTipoProducto/EditarEstadoTipoProductoResponse';
import { ObtenerTipoProductoResponse } from '../models/TipoProducto/ObtenerTipoProducto/ObtenerTipoProductoResponse';
import { VerTipoProductoResponse } from '../models/TipoProducto/VerTipoProducto/VerTipoProductoResponse';
import { EditarTipoProductoResponse } from '../models/TipoProducto/EditarTipoProducto/EditarTipoProductoResponse';
import { EditarTipoProductoRequest } from '../models/TipoProducto/EditarTipoProducto/EditarTipoProductoRequest';
import { ObtenerTipoProductoMenuResponse } from '../models/TipoProducto/ObtenerTipoProductoMenu/ObtenerTipoProductoMenuResponse';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService extends Api {
  RegistrarTipoProducto(request: AgregarTipoProductoRequest): Observable<AgregarTipoProductoResponse> {
    const uri = `${this.url}TipoProducto/agregarTipoProducto`;
    return this.http.post<AgregarTipoProductoResponse>(uri, request, { headers: this._headers });
  }

  ObtenerTipoProducto(request: ObtenerTipoProductoRequest): Observable<ObtenerTipoProductoResponse> {
    const uri = `${this.url}TipoProducto/obtenerTipoProducto`;
    return this.http.post<ObtenerTipoProductoResponse>(uri, request, { headers: this._headers });
  }

  VerTipoProducto(idTipoProducto: number): Observable<VerTipoProductoResponse> {
    const uri = `${this.url}TipoProducto/verTipoProducto/${idTipoProducto}`;
    return this.http.get<VerTipoProductoResponse>(uri, { headers: this._headers });
  }

  EditarTipoProducto(request: EditarTipoProductoRequest): Observable<EditarTipoProductoResponse> {
    const uri = `${this.url}TipoProducto/editarTipoProducto`;
    return this.http.put<EditarTipoProductoResponse>(uri, request, { headers: this._headers });
  }

  EditarEstadoTipoProducto(idTipoProducto: number): Observable<EditarEstadoTipoProductoResponse> {
    const uri = `${this.url}TipoProducto/editarEstadoTipoProducto/${idTipoProducto}`;
    return this.http.delete<EditarEstadoTipoProductoResponse>(uri, { headers: this._headers });
  }

  ObtenerTipoProductoMenu(): Observable<Array<ObtenerTipoProductoMenuResponse>> {
    const uri = `${this.url}TipoProducto/obtenerTipoProductoMenu`;
    return this.http.get<Array<ObtenerTipoProductoMenuResponse>>(uri, { headers: this._headers });
  }
}
