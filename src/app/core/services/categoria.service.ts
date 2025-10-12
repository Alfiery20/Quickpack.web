import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { Observable } from 'rxjs';
import { AgregarCategoriaRequest } from '../models/Categoria/AgregarCategoria/AgregarCategoriaRequest';
import { AgregarCategoriaResponse } from '../models/Categoria/AgregarCategoria/AgregarCategoriaResponse';
import { EditarCategoriaRequest } from '../models/Categoria/EditarCategoria/EditarCategoriaRequest';
import { EditarCategoriaResponse } from '../models/Categoria/EditarCategoria/EditarCategoriaResponse';
import { EditarEstadoCategoriaResponse } from '../models/Categoria/EditarEstadoCategoria/EditarEstadoCategoriaResponse';
import { ObtenerCategoriaRequest } from '../models/Categoria/ObtenerCategoria/ObtenerCategoriaRequest';
import { ObtenerCategoriaResponse } from '../models/Categoria/ObtenerCategoria/ObtenerCategoriaResponse';
import { VerCategoriaResponse } from '../models/Categoria/VerCategoria/VerCategoriaResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends Api {

  RegistrarCategoria(request: AgregarCategoriaRequest): Observable<AgregarCategoriaResponse> {
    const uri = `${this.url}Categoria/agregarCategoria`;
    return this.http.post<AgregarCategoriaResponse>(uri, request, { headers: this._headers });
  }

  ObtenerCategoria(request: ObtenerCategoriaRequest): Observable<ObtenerCategoriaResponse> {
    const uri = `${this.url}Categoria/obtenerCategoria`;
    return this.http.post<ObtenerCategoriaResponse>(uri, request, { headers: this._headers });
  }

  VerCategoria(idCategoria: number): Observable<VerCategoriaResponse> {
    const uri = `${this.url}Categoria/verCategoria/${idCategoria}`;
    return this.http.get<VerCategoriaResponse>(uri, { headers: this._headers });
  }

  EditarCategoria(request: EditarCategoriaRequest): Observable<EditarCategoriaResponse> {
    const uri = `${this.url}Categoria/editarCategoria`;
    return this.http.put<EditarCategoriaResponse>(uri, request, { headers: this._headers });
  }

  EditarEstadoCategoria(idCategoria: number): Observable<EditarEstadoCategoriaResponse> {
    const uri = `${this.url}Categoria/editarEstadoCategoria/${idCategoria}`;
    return this.http.delete<EditarEstadoCategoriaResponse>(uri, { headers: this._headers });
  }
}
