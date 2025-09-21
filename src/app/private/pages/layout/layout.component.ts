import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AutorizacionService } from '../../../core/services/autorizacion.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ObtenerMenuRequest } from '../../../core/models/ObtenerMenu/ObtenerMenuRequest';
import { ObtenerMenuResponse } from '../../../core/models/ObtenerMenu/ObtenerMenuResponse';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  sidebarOpen = false;

  menus: ObtenerMenuResponse[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private autorizacionService: AutorizacionService
  ) {
  }

  ngOnInit(): void {
    var usuario = JSON.parse(JSON.stringify(this.localStorage.getItem('usuario')));
    var id = usuario.id;
    var idRol = usuario.idRol;
    var obtenerMenu: ObtenerMenuRequest = {
      idRol: idRol,
      idUsuario: id
    }
    this.autorizacionService.ObtenerMenu(obtenerMenu).subscribe(
      (response) => {
        this.menus = response;
      }
    )
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleMenu(item: any) {
    item.isOpen = !item.isOpen;
  }

}
