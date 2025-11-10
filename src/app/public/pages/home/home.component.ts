import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrivateRoutingModule } from "../../../private/private-routing.module";
import { RouterModule } from '@angular/router';
import { LandingService } from '../../../core/services/landing.service';
import { ObtenerTipoProductoMenuLandingResponse } from '../../../core/models/Landing/ObtenerTipoProductoMenuLanding/ObtenerTipoProductoMenuLandingResponse';
import { constants } from '../../../core/models/utils/contants';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PrivateRoutingModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  menuAbierto = false;
  submenuActivo: number | null = null;
  menuActivo: number | null = null;

  tipoProductos: ObtenerTipoProductoMenuLandingResponse[] = [];

  numberWssp: string = '';

  constructor(
    private landingService: LandingService
  ) {

  }

  ngOnInit(): void {
    this.numberWssp = constants.NumberPhone
    this.landingService.ObtenerTipoProductoLandingMenu().subscribe(
      (response) => {
        this.tipoProductos = response;
      });
  }

  toggleMenu(index: number): void {
    this.menuActivo = this.menuActivo === index ? null : index;
  }

  toggleSubmenu(index: number): void {
    this.submenuActivo = this.submenuActivo === index ? null : index;
  }
}
