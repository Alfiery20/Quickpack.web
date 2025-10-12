import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RolService } from '../../../../core/services/rol.service';
import { CommonModule } from '@angular/common';
import { ObtenerPermisosRolResponse } from '../../../../core/models/Rol/ObtenerPermisosRol/ObtenerPermisosRolResponse';
import { AsignarPermisoRequest } from '../../../../core/models/Rol/AsignarPermiso/AsignarPermisoRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-menu',
  imports: [CommonModule],
  templateUrl: './asignar-menu.component.html',
  styleUrl: './asignar-menu.component.scss'
})
export class AsignarMenuComponent implements OnChanges {

  @Input() idRol: number = 0;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  permisos: ObtenerPermisosRolResponse[] = [];

  constructor(
    private rolService: RolService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.idRol != 0) {
      this.rolService.ObtenerPermisosRol(this.idRol).subscribe(
        (response) => {
          this.permisos = response;
        });
    }
  }

  AsignarPermiso(permiso: ObtenerPermisosRolResponse) {
    var request: AsignarPermisoRequest = {
      idPermiso: permiso.isPermiso,
      idMenu: permiso.idMenu,
      idRol: this.idRol
    };
    this.rolService.AsignarPermiso(request).subscribe(
      (response) => {
        if (response.codigo == "OK") {
          Swal.fire({
            title: "Conforme!",
            text: response.mensaje,
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.mensaje,
            icon: "error"
          });
        }
      }
    );
  }

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }
}
