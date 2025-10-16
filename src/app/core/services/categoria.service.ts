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
import { AgregarBeneficipRequest } from '../models/Categoria/AgregarBeneficio/AgregarBeneficipRequest';
import { AgregarBeneficioResponse } from '../models/Categoria/AgregarBeneficio/AgregarBeneficioResponse';
import { ObtenerBeneficio, ObtenerBeneficioResponse } from '../models/Categoria/ObtenerBeneficio/ObtenerBeneficioResponse';
import { AgregarCaracteristicaRequest } from '../models/Categoria/AgregarCaracteristica/AgregarCaracteristicaRequest';
import { AgregarCaracteristicaResponse } from '../models/Categoria/AgregarCaracteristica/AgregarCaracteristicaResponse';
import { ObtenerCaracteristicaResponse } from '../models/Categoria/ObtenerCaracteristica/ObtenerCaracteristicaResponse';
import { VerCaracteristicaResponse } from '../models/Categoria/VerCaracteristica/VerCaracteristicaResponse';
import { EliminarCaracteristicaResponse } from '../models/Categoria/EliminarCaracteristica/EliminarCaracteristicaResponse';

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

  RegistrarBeneficio(request: AgregarBeneficipRequest): Observable<AgregarBeneficioResponse> {
    const uri = `${this.url}Categoria/agregarBeneficio`;
    return this.http.post<AgregarBeneficioResponse>(uri, request, { headers: this._headers });
  }

  ObtenerBeneficio(idCategoria: number): Observable<ObtenerBeneficioResponse> {
    const uri = `${this.url}Categoria/obtenerBeneficio/${idCategoria}`;
    return this.http.get<ObtenerBeneficioResponse>(uri, { headers: this._headers });
  }

  RegistrarCaracteristica(request: AgregarCaracteristicaRequest): Observable<AgregarCaracteristicaResponse> {
    const uri = `${this.url}Categoria/agregarCaracteristica`;
    return this.http.post<AgregarCaracteristicaResponse>(uri, request, { headers: this._headers });
  }

  ObtenerCaracteristica(idCaracteristica: number): Observable<Array<ObtenerCaracteristicaResponse>> {
    const uri = `${this.url}Categoria/obtenerCaracteristica/${idCaracteristica}`;
    return this.http.get<Array<ObtenerCaracteristicaResponse>>(uri, { headers: this._headers });
  }

  VerCaracteristica(idCaracteristica: number): Observable<VerCaracteristicaResponse> {
    const uri = `${this.url}Categoria/verCaracteristica/${idCaracteristica}`;
    return this.http.get<VerCaracteristicaResponse>(uri, { headers: this._headers });
  }

  EliminarCaracteristica(idCaracteristica: number): Observable<EliminarCaracteristicaResponse> {
    const uri = `${this.url}Categoria/eliminarCaracteristica/${idCaracteristica}`;
    return this.http.delete<EliminarCaracteristicaResponse>(uri, { headers: this._headers });
  }
}
