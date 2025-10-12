import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AutorizacionService } from '../../../core/services/autorizacion.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ObtenerMenuRequest } from '../../../core/models/Autorizacion/ObtenerMenu/ObtenerMenuRequest';
import { ObtenerMenuResponse } from '../../../core/models/Autorizacion/ObtenerMenu/ObtenerMenuResponse';
import { IniciarSesionResponse } from '../../../core/models/Autorizacion/IniciarSesion/IniciarSesionResponse';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  sidebarOpen = false;

  popupOpen: boolean = false;

  menus: ObtenerMenuResponse[] = [];

  userLogin: IniciarSesionResponse = {} as IniciarSesionResponse;

  constructor(
    private localStorage: LocalStorageService,
    private autorizacionService: AutorizacionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userLogin = JSON.parse(JSON.stringify(this.localStorage.getItem('usuario')));
    var id = this.userLogin.id;
    var idRol = this.userLogin.idRol;
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

  togglePopup() {
    this.popupOpen = !this.popupOpen;
  }

  cerrarSesion() {
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('usuario');
    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
