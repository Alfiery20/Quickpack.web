import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginacionComponent } from '../../../shared/paginacion/paginacion.component';
import { Categoria } from '../../../core/models/Categoria/ObtenerCategoria/ObtenerCategoriaResponse';
import { Producto } from '../../../core/models/Producto/ObtenerProducto/ObtenerProductoResponse';
import { ProductoService } from '../../../core/services/producto.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ObtenerCategoriaMenuResponse } from '../../../core/models/Categoria/ObtenerCategoriaMenu/ObtenerCategoriaMenuResponse';
import { ObtenerProductoRequest } from '../../../core/models/Producto/ObtenerProducto/ObtenerProductoRequest';
import { AgregarEditarProductoComponent } from "./agregar-editar-producto/agregar-editar-producto.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, ReactiveFormsModule, PaginacionComponent, AgregarEditarProductoComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit {
  formulario!: FormGroup;
  pagina: number = 1;
  cantidad: number = 10;
  total: number = 0;

  totalPaginas: number = 0;

  categoriasMenu: ObtenerCategoriaMenuResponse[] = [];

  productos: Producto[] = [];

  modalAbiertoAgregarEditar: boolean = false;

  idProductoSeleccionado: number = 0;

  constructor(
    private fb: FormBuilder,
    private productoServices: ProductoService,
    private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: [''],
      idCategoria: [0]
    });
    this.ObtenerProducto();
    this.ObtenerCategoriasMenu();
  }

  ObtenerCategoriasMenu() {
    this.categoriaService.ObtenerCategoriaMenu().subscribe(
      (response) => {
        this.categoriasMenu = response;
      }
    )
  }

  ObtenerProducto() {
    var obtenerProducto: ObtenerProductoRequest = {
      termino: this.formulario.value.nombre,
      idCategoria: this.formulario.value.idCategoria,
      cantidad: this.cantidad,
      pagina: this.pagina
    }

    this.productoServices.ObtenerProducto(obtenerProducto).subscribe(
      (response) => {
        this.productos = response.productos;
        this.pagina = response.pagina;
        this.total = response.total;
        this.totalPaginas = Math.ceil(this.total / this.cantidad);
      }
    )
  }

  abrirModalAgregarEditar(id?: number) {
    this.modalAbiertoAgregarEditar = true;
    if (id) {
      this.idProductoSeleccionado = id;
    }
  }

  cerrarModalAgregarEditar() {
    this.modalAbiertoAgregarEditar = false;
    this.idProductoSeleccionado = 0;
    this.ObtenerProducto();
  }

  Paginar(page: number) {
    this.pagina = page;
    this.ObtenerProducto();
  }

  CambiarEstado(idProducto: number) {
      Swal.fire({
        title: "¿Estas seguro de cambiar el estado del Producto?",
        text: "El estado de la Producto, va a cambiar, esta accion es reversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.productoServices.EditarEstadoProducto(idProducto).subscribe(
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
              } this.ObtenerProducto();
            }
          )
        }
      });
    }

}
