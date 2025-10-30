import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../../core/services/landing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-empresa',
  imports: [CommonModule],
  templateUrl: './videos-empresa.component.html',
  styleUrl: './videos-empresa.component.scss'
})
export class VideosEmpresaComponent implements OnInit {

  videos: any[] = [
    {
      titulo: 'VIDEO PRUEBA 1',
      descripcion: 'DESCRIPCION VIDEO PRUEBA 1',
    },
    {
      titulo: 'VIDEO PRUEBA 1',
      descripcion: 'DESCRIPCION VIDEO PRUEBA 1',
    },
    {
      titulo: 'VIDEO PRUEBA 1',
      descripcion: 'DESCRIPCION VIDEO PRUEBA 1',
    },
    {
      titulo: 'VIDEO PRUEBA 1',
      descripcion: 'DESCRIPCION VIDEO PRUEBA 1',
    },
    {
      titulo: 'VIDEO PRUEBA 1',
      descripcion: 'DESCRIPCION VIDEO PRUEBA 1',
    },
    {
      titulo: 'VIDEO PRUEBA 1',
      descripcion: 'DESCRIPCION VIDEO PRUEBA 1',
    }
  ];

  constructor(
    private landingService: LandingService
  ) {

  }

  ngOnInit(): void {
  }

}
