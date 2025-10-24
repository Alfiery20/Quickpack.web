import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarProductoRequest } from '../models/Producto/AgregarProducto/AgregarProductoRequest';
import { AgregarProductoResponse } from '../models/Producto/AgregarProducto/AgregarProductoResponse';
import { EditarEstadoProductoResponse } from '../models/Producto/EditarEstadoProducto/EditarEstadoProductoResponse';
import { EditarProductoRequest } from '../models/Producto/EditarProducto/EditarProductoRequest';
import { EditarProductoResponse } from '../models/Producto/EditarProducto/EditarProductoResponse';
import { ObtenerProductoRequest } from '../models/Producto/ObtenerProducto/ObtenerProductoRequest';
import { ObtenerProductoResponse } from '../models/Producto/ObtenerProducto/ObtenerProductoResponse';
import { VerProductoResponse } from '../models/Producto/VerProducto/VerProductoResponse';
import { Api } from '../models/utils/Api';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends Api {

  RegistrarProducto(request: AgregarProductoRequest): Observable<AgregarProductoResponse> {
    const uri = `${this.url}Producto/agregarProducto`;
    return this.http.post<AgregarProductoResponse>(uri, request, { headers: this._headers });
  }

  ObtenerProducto(request: ObtenerProductoRequest): Observable<ObtenerProductoResponse> {
    const uri = `${this.url}Producto/obtenerProducto`;
    return this.http.post<ObtenerProductoResponse>(uri, request, { headers: this._headers });
  }

  VerProducto(idProducto: number): Observable<VerProductoResponse> {
    const uri = `${this.url}Producto/verProducto/${idProducto}`;
    return this.http.get<VerProductoResponse>(uri, { headers: this._headers });
  }

  EditarProducto(request: EditarProductoRequest): Observable<EditarProductoResponse> {
    const uri = `${this.url}Producto/editarProducto`;
    return this.http.put<EditarProductoResponse>(uri, request, { headers: this._headers });
  }

  EditarEstadoProducto(idProducto: number): Observable<EditarEstadoProductoResponse> {
    const uri = `${this.url}Producto/editarEstadoProducto/${idProducto}`;
    return this.http.delete<EditarEstadoProductoResponse>(uri, { headers: this._headers });
  }
}
