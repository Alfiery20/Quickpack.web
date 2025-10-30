import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit, OnDestroy {
  imagenes = [
    'Carrusel_Inicio/01.jpg',
    'Carrusel_Inicio/02.jpg',
    'Carrusel_Inicio/03.jpg'
  ];
  indiceActivo = 0;
  intervalo: any;
  segundosTransicion = 5;

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.indiceActivo = (this.indiceActivo + 1) % this.imagenes.length;
    }, this.segundosTransicion * 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

}
