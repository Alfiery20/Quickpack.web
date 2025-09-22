import { Injectable } from '@angular/core';
import { Api } from '../models/utils/Api';
import { RegistrarRolRequest } from '../models/RegistrarRol/RegistrarRolRequest';
import { RegistrarRolResponse } from '../models/RegistrarRol/RegistrarRolResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService extends Api {

  RegistrarRol(request: RegistrarRolRequest): Observable<RegistrarRolResponse> {
    const uri = `${this.url}Rol/agregarRoles`;
    return this.http.post<RegistrarRolResponse>(uri, request, { headers: this._headers });
  }

}
