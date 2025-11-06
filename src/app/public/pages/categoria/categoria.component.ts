import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContactanosComponent } from "../contactanos/contactanos.component";
import { ObtenerCategoriaLandingResponse } from '../../../core/models/Landing/ObtenerCategoriaLanding/ObtenerCategoriaLandingResponse';
import { CommonModule } from '@angular/common';
import { LandingService } from '../../../core/services/landing.service';

@Component({
  selector: 'app-categoria',
  imports: [ContactanosComponent, RouterModule, CommonModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {

  idTipoProducto: number = 0;
  idCategoria: number = 0;

  previewUrl: string | null = null;

  categoriaLanding: ObtenerCategoriaLandingResponse = {} as ObtenerCategoriaLandingResponse


  constructor(
    private route: ActivatedRoute,
    private landingService: LandingService
  ) {
  }

  ngOnInit(): void {
    this.idTipoProducto = parseInt(this.route.snapshot.paramMap.get("idTipoProducto") || "0")
    this.idCategoria = parseInt(this.route.snapshot.paramMap.get("idCategoria") || "0")
    this.landingService.ObtenerCategoriaLanding(this.idTipoProducto, this.idCategoria).subscribe(
      (response) => {
        this.categoriaLanding = response;
        this.previewUrl = response.multimedia ?? null;
      }
    )
  }

}
