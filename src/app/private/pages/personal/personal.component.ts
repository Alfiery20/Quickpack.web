import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginacionComponent } from '../../../shared/paginacion/paginacion.component';
import { EmpleadoService } from '../../../core/services/empleado.service';
import { ObtenerMenuResponse } from '../../../core/models/Autorizacion/ObtenerMenu/ObtenerMenuResponse';
import { ObtenerEmpleadoRequest } from '../../../core/models/Empleado/ObtenerEmpleado/ObtenerEmpleadoRequest';
import { ObtenerEmpleadoResponse } from '../../../core/models/Empleado/ObtenerEmpleado/ObtenerEmpleadoResponse';
import { constants } from '../../../core/models/utils/contants';
import Swal from 'sweetalert2';
import { AgregarEditarPersonalComponent } from "./agregar-editar-personal/agregar-editar-personal.component";

@Component({
  selector: 'app-personal',
  imports: [CommonModule, ReactiveFormsModule, PaginacionComponent, AgregarEditarPersonalComponent],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {

  formulario!: FormGroup;
  pagina: number = 1;
  cantidad: number = 10;
  total: number = 0;
  totalPaginas: number = 0;

  modalAbiertoAgregarEditar = false;
  idEmpleadoSeleccionado: number = 0;

  empleados: ObtenerEmpleadoResponse = {} as ObtenerEmpleadoResponse;

  utils = new constants;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService
  ) {

  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: [''],
      nroDocumento: ['']
    });
    this.ObtenerEmpleado();
  }

  ObtenerEmpleado() {
    var request: ObtenerEmpleadoRequest = {
      nombre: this.formulario.value.nombre,
      nroDocumento: this.formulario.value.nroDocumento,
      pagina: this.pagina,
      cantidad: this.cantidad,
      total: this.total
    }

    this.empleadoService.ObtenerEmpleado(request).subscribe(
      (response) => {
        this.empleados = response;
        this.pagina = response.pagina;
        this.total = response.total;
        this.totalPaginas = Math.ceil(this.total / this.cantidad);
      }
    );
  }

  Paginar(page: number) {
    this.pagina = page;
    this.ObtenerEmpleado();
  }

  CambiarEstado(idEmpleado: number) {
    Swal.fire({
      title: "¿Estas seguro de cambiar el estado del empleado?",
      text: "El estado del empleado, va a cambiar, esta accion es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.EditarEstadoEmpleado(idEmpleado).subscribe(
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
            }
            this.ObtenerEmpleado();
          }
        )
      }
    });
  }

  abrirModalAgregarEditar(id?: number) {
    this.modalAbiertoAgregarEditar = true;
    if (id) {
      this.idEmpleadoSeleccionado = id;
    }
  }

  cerrarModalAgregarEditar() {
    this.modalAbiertoAgregarEditar = false;
    this.idEmpleadoSeleccionado = 0;
    this.ObtenerEmpleado();
  }

}
