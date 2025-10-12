import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginacionComponent } from '../../../shared/paginacion/paginacion.component';
import { TipoProductoService } from '../../../core/services/tipo-producto.service';
import { ObtenerTipoProductoRequest } from '../../../core/models/TipoProducto/ObtenerTipoProducto/ObtenerTipoProductoRequest';
import { Empleado } from '../../../core/models/Empleado/ObtenerEmpleado/ObtenerEmpleadoResponse';
import { TipoProducto } from '../../../core/models/TipoProducto/ObtenerTipoProducto/ObtenerTipoProductoResponse';
import { AgregarEditarTipoProductoComponent } from "./agregar-editar-tipo-producto/agregar-editar-tipo-producto.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-producto',
  imports: [CommonModule, ReactiveFormsModule, PaginacionComponent, AgregarEditarTipoProductoComponent],
  templateUrl: './tipo-producto.component.html',
  styleUrl: './tipo-producto.component.scss'
})
export class TipoProductoComponent implements OnInit {
  formulario!: FormGroup;
  pagina: number = 1;
  cantidad: number = 10;
  total: number = 0;
  totalPaginas: number = 0;

  modalAbiertoAgregarEditar = false;

  idTipProductoSeleccionado: number = 0;

  tipoProductos: TipoProducto[] = [];

  constructor(
    private fb: FormBuilder,
    private tipoProductoService: TipoProductoService
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['']
    });
    this.ObtenerTipoProducto();
  }

  Paginar(page: number) {
    this.pagina = page;
    this.ObtenerTipoProducto();
  }

  ObtenerTipoProducto() {
    const nombre = this.formulario.value.nombre;
    var request: ObtenerTipoProductoRequest = {
      termino: nombre,
      cantidad: this.cantidad,
      pagina: this.pagina
    };
    this.tipoProductoService.ObtenerTipoProducto(request).subscribe(
      (response) => {
        this.tipoProductos = response.tipoProducto;
        this.pagina = response.pagina;
        this.total = response.total;
        this.totalPaginas = Math.ceil(this.total / this.cantidad);
      }

    )
  }

  abrirModalAgregarEditar(id?: number) {
    this.modalAbiertoAgregarEditar = true;
    if (id) {
      this.idTipProductoSeleccionado = id;
    }
  }

  cerrarModalAgregarEditar() {
    this.modalAbiertoAgregarEditar = false;
    this.idTipProductoSeleccionado = 0;
    this.ObtenerTipoProducto();
  }

  CambiarEstado(idTipoProducto: number) {
      Swal.fire({
        title: "¿Estas seguro de cambiar el estado del Tipo de Producto?",
        text: "El estado del Tipo de Producto, va a cambiar, esta accion es reversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoProductoService.EditarEstadoTipoProducto(idTipoProducto).subscribe(
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
              }this.ObtenerTipoProducto();
            }
          )
        }
      });
    }
}
