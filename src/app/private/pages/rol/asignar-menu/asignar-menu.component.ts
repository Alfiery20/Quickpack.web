import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RolService } from '../../../../core/services/rol.service';
import { CommonModule } from '@angular/common';
import { ObtenerPermisosRolResponse } from '../../../../core/models/ObtenerPermisosRol/ObtenerPermisosRolResponse';

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

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {
  }
}
