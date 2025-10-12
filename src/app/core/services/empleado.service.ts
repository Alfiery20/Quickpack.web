import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { ObtenerEmpleadoRequest } from '../models/Empleado/ObtenerEmpleado/ObtenerEmpleadoRequest';
import { ObtenerEmpleadoResponse } from '../models/Empleado/ObtenerEmpleado/ObtenerEmpleadoResponse';
import { Observable } from 'rxjs';
import { EditarEstadoEmpleadoResponse } from '../models/Empleado/EditarEstadoEmpleado/EditarEstadoEmpleadoResponse';
import { VerPersonalResponse } from '../models/Empleado/VerPersonal/VerPersonalResponse';
import { RegistrarEmpleadoRequest } from '../models/Empleado/RegistrarEmpleado/RegistrarEmpleadoRequest';
import { RegistrarEmpleadoReponse } from '../models/Empleado/RegistrarEmpleado/RegistrarEmpleadoResponse';
import { EditarEmpleadoRequest } from '../models/Empleado/EditarEmpleado/EditarEmpleadoRequest';
import { EditarEmpleadoResponse } from '../models/Empleado/EditarEmpleado/EditarEmpleadoResponse';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends Api {

  RegistrarEmpleado(request: RegistrarEmpleadoRequest): Observable<RegistrarEmpleadoReponse> {
    const uri = `${this.url}Empleado/agregarEmpleado`;
    return this.http.post<RegistrarEmpleadoReponse>(uri, request, { headers: this._headers });
  }

  ObtenerEmpleado(request: ObtenerEmpleadoRequest): Observable<ObtenerEmpleadoResponse> {
    const uri = `${this.url}Empleado/obtenerEmpleado`;
    return this.http.post<ObtenerEmpleadoResponse>(uri, request, { headers: this._headers });
  }

  EditarEstadoEmpleado(idEmpleado: number): Observable<EditarEstadoEmpleadoResponse> {
    const uri = `${this.url}Empleado/editarEstadoEmpleado/${idEmpleado}`;
    return this.http.delete<EditarEstadoEmpleadoResponse>(uri, { headers: this._headers });
  }

  VerEmpleado(idEmpleado: number): Observable<VerPersonalResponse> {
    const uri = `${this.url}Empleado/verEmpleado/${idEmpleado}`;
    return this.http.get<VerPersonalResponse>(uri, { headers: this._headers });
  }

  EditarEmpleado(request: EditarEmpleadoRequest): Observable<EditarEmpleadoResponse> {
    const uri = `${this.url}Empleado/editarEmpleado`;
    return this.http.put<EditarEmpleadoResponse>(uri, request, { headers: this._headers });
  }
}
