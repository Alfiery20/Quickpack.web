import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { RegistrarRolRequest } from '../models/RegistrarRol/RegistrarRolRequest';
import { RegistrarRolResponse } from '../models/RegistrarRol/RegistrarRolResponse';
import { Observable } from 'rxjs';
import { ObtenerRolRequest } from '../models/ObtenerRol/ObtenerRolRequest';
import { ObtenerRolResponse } from '../models/ObtenerRol/ObtenerRolResponse';
import { VerRolResponse } from '../models/VerRol/VerRolResponse';
import { EditarRolRequest } from '../models/EditarRol/EditarRolRequest';
import { EditarRolResponse } from '../models/EditarRol/EditarRolResponse';
import { EditarEstadoRolResponse } from '../models/EditarEstadoRol/EditarEstadoRolResponse';
import { ObtenerPermisosRolResponse } from '../models/ObtenerPermisosRol/ObtenerPermisosRolResponse';
import { AsignarPermisoRequest } from '../models/AsignarPermiso/AsignarPermisoRequest';
import { AsignarPermisoResponse } from '../models/AsignarPermiso/AsignarPermisoResponse';
import { ObtenerRolMenuResponse } from '../models/ObtenerRolMenu/ObtenerRolMenuResponse';

@Injectable({
  providedIn: 'root'
})
export class RolService extends Api {

  RegistrarRol(request: RegistrarRolRequest): Observable<RegistrarRolResponse> {
    const uri = `${this.url}Rol/agregarRoles`;
    return this.http.post<RegistrarRolResponse>(uri, request, { headers: this._headers });
  }

  ObtenerRol(request: ObtenerRolRequest): Observable<ObtenerRolResponse> {
    const uri = `${this.url}Rol/obtenerRoles`;
    return this.http.post<ObtenerRolResponse>(uri, request, { headers: this._headers });
  }

  VerRol(idRol: number): Observable<VerRolResponse> {
    const uri = `${this.url}Rol/verRol/${idRol}`;
    return this.http.get<VerRolResponse>(uri, { headers: this._headers });
  }

  EditarRol(request: EditarRolRequest): Observable<EditarRolResponse> {
    const uri = `${this.url}Rol/editarRol`;
    return this.http.put<EditarRolResponse>(uri, request, { headers: this._headers });
  }

  EditarEstadoRol(idRol: number): Observable<EditarEstadoRolResponse> {
    const uri = `${this.url}Rol/editarEstadoRol/${idRol}`;
    return this.http.delete<EditarEstadoRolResponse>(uri, { headers: this._headers });
  }

  ObtenerPermisosRol(idRol: number): Observable<Array<ObtenerPermisosRolResponse>> {
    const uri = `${this.url}Rol/obtenerPermisoRol/${idRol}`;
    return this.http.get<Array<ObtenerPermisosRolResponse>>(uri, { headers: this._headers });
  }

  AsignarPermiso(request: AsignarPermisoRequest): Observable<AsignarPermisoResponse> {
    const uri = `${this.url}Rol/asignarPermiso`;
    return this.http.post<AsignarPermisoResponse>(uri, request, { headers: this._headers });
  }

  ObtenerRolMenu(): Observable<Array<ObtenerRolMenuResponse>> {
    const uri = `${this.url}Rol/obtenerRolMenu`;
    return this.http.get<Array<ObtenerRolMenuResponse>>(uri, { headers: this._headers });
  }

}
