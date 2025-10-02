import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginacionComponent } from '../../../shared/paginacion/paginacion.component';

@Component({
  selector: 'app-tipo-producto',
  imports: [CommonModule, ReactiveFormsModule, PaginacionComponent],
  templateUrl: './tipo-producto.component.html',
  styleUrl: './tipo-producto.component.scss'
})
export class TipoProductoComponent implements OnInit{
  formulario!: FormGroup;
  pagina: number = 1;
  cantidad: number = 10;
  total: number = 0;
  totalPaginas: number = 0;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['']
    });
  }

    Paginar(page: number) {
    this.pagina = page;
    // this.ObtenerRoles();
  }
}
