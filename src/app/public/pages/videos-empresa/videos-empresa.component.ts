import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../../core/services/landing.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos-empresa',
  imports: [CommonModule],
  templateUrl: './videos-empresa.component.html',
  styleUrl: './videos-empresa.component.scss'
})
export class VideosEmpresaComponent implements OnInit {

  videos: any[] = [
    {
      titulo: 'PRUEBA DE EMPAQUE FLOW PACK HDL 600',
      descripcion: 'El video demuestra cómo funciona una máquina automática de empaque Flow Pack HDL 600 durante una prueba de empaquetado.',
      url: 'https://www.youtube.com/embed/A2yeRa00v_I?si=2ydDL9roisGbA2Z8'
    },
    {
      titulo: 'Máquina de campana EKH-455 empacando papel',
      descripcion: 'El video busca contar o acompañar una historia utilizando música y elementos visuales para crear una experiencia narrativa o artística.',
      url: 'https://www.youtube.com/embed/Fj-WJQuAN1Y?si=KRIudlK-fwjXV-zh'
    },
    {
      titulo: 'Asociación de productores lácteos 100%pampuno Tayacaja, maquina Jumbo 30 empacando quesos.',
      descripcion: 'El video demuestra cómo funciona una máquina automática de empaque Flow Pack HDL 600 durante una prueba de empaquetado.',
      url: 'https://www.youtube.com/embed/vt99ysmY0f4?si=7Kk4VglwwP0wFMwV'
    },
    {
      titulo: '5 buenas razones para escoger los abatidores Afinox',
      descripcion: 'El video muestra el funcionamiento de una máquina industrial utilizada para el procesamiento o empaquetado de productos, donde se observa cómo el equipo trabaja de manera automática para realizar las tareas de producción de forma rápida y eficiente.',
      url: 'https://www.youtube.com/embed/XxLK3uQh8t8?si=f2Qu45mZ0EErjRVn'
    },
    {
      titulo: 'Selladora Automatica en L APSS 7538',
      descripcion: 'El video muestra una máquina industrial en funcionamiento, donde se observa el proceso automatizado utilizado para procesar o empaquetar productos de manera rápida y eficiente dentro de una línea de producción.',
      url: 'https://www.youtube.com/embed/VcTV2qQMjhg?si=QZNqXowqWJEOrpL3'
    },
    {
      titulo: 'IInfinity de AFINOX El abatidor multifunción del frío al calor en un toque',
      descripcion: 'El video muestra el funcionamiento de una máquina industrial dentro de una línea de producción, donde se observa el proceso automatizado utilizado para manipular o empaquetar productos de forma rápida y eficiente.',
      url: 'https://www.youtube.com/embed/vw4plCsa92A?si=cnyWadC3LFzCTPvO'
    },
  ];

  constructor(
    private landingService: LandingService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
  }

  getVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
