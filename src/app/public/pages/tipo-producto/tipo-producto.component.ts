import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingService } from '../../../core/services/landing.service';
import { ObtenerTipoProductoLandingResponse } from '../../../core/models/Landing/ObtenerTipoProductoLanding/ObtenerTipoProductoLandingResponse';
import { ContactanosComponent } from "../contactanos/contactanos.component";

@Component({
  selector: 'app-tipo-producto',
  imports: [ContactanosComponent],
  templateUrl: './tipo-producto.component.html',
  styleUrl: './tipo-producto.component.scss'
})
export class TipoProductoComponent implements OnInit {

  idTipoProducto: number = 0;
  tipoProductoLanding: ObtenerTipoProductoLandingResponse = {} as ObtenerTipoProductoLandingResponse;

  previewUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private landingService: LandingService
  ) {

  }

  ngOnInit(): void {
    this.idTipoProducto = parseInt(this.route.snapshot.paramMap.get("id") || "0")

    this.landingService.ObtenerTipoProductoLanding(this.idTipoProducto).subscribe(
      (response) => {
        this.tipoProductoLanding = response;
        this.previewUrl = response.multimedia ?? null;
        console.log(this.tipoProductoLanding);

      }
    )

  }

}
