import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ObtenerCategoriaRequest } from '../../../core/models/Categoria/ObtenerCategoria/ObtenerCategoriaRequest';
import { Categoria } from '../../../core/models/Categoria/ObtenerCategoria/ObtenerCategoriaResponse';
import { CategoriaService } from '../../../core/services/categoria.service';
import { CommonModule } from '@angular/common';
import { PaginacionComponent } from '../../../shared/paginacion/paginacion.component';
import { AgregarEditarCategoriaComponent } from './agregar-editar-categoria/agregar-editar-categoria.component';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, ReactiveFormsModule, PaginacionComponent, AgregarEditarCategoriaComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {
  formulario!: FormGroup;
  pagina: number = 1;
  cantidad: number = 10;
  total: number = 0;
  totalPaginas: number = 0;

  idCategoriaSeleccionado: number = 0;

  modalAbiertoAgregarEditar = false;

  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['']
    });
    this.ObtenerCategoria();
  }
  ObtenerCategoria() {
    const nombre = this.formulario.value.nombre;
    var request: ObtenerCategoriaRequest = {
      termino: nombre,
      cantidad: this.cantidad,
      pagina: this.pagina
    };
    this.categoriaService.ObtenerCategoria(request).subscribe(
      (response) => {
        this.categorias = response.categorias;
        this.pagina = response.pagina;
        this.total = response.total;
        this.totalPaginas = Math.ceil(this.total / this.cantidad);
      }

    )
  }

  Paginar(page: number) {
    this.pagina = page;
    this.ObtenerCategoria();
  }

  abrirModalAgregarEditar(id?: number) {
    this.modalAbiertoAgregarEditar = true;
    if (id) {
      this.idCategoriaSeleccionado = id;
    }
  }

  cerrarModalAgregarEditar() {
    this.modalAbiertoAgregarEditar = false;
    this.idCategoriaSeleccionado = 0;
    this.ObtenerCategoria();
  }

  CambiarEstado(idCategoria: number) {
    Swal.fire({
      title: "¿Estas seguro de cambiar el estado de la Categoria?",
      text: "El estado de la Categoria, va a cambiar, esta accion es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.EditarEstadoCategoria(idCategoria).subscribe(
          (response) => {
            if (response.codigo == "OK") {
              Swal.fire({
                title: "Conforme!",
                text: response.mensaje,
                icon: "success"
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: response.mensaje,
                icon: "error"
              });
            } this.ObtenerCategoria();
          }
        )
      }
    });
  }
}
