import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginacionComponent } from "../../../shared/paginacion/paginacion.component";
import { AgregarEditarRolComponent } from "./agregar-editar-rol/agregar-editar-rol.component";
import { RolService } from '../../../core/services/rol.service';
import { ObtenerRolRequest } from '../../../core/models/Rol/ObtenerRol/ObtenerRolRequest';
import { Rol } from '../../../core/models/Rol/ObtenerRol/ObtenerRolResponse';
import Swal from 'sweetalert2';
import { AsignarMenuComponent } from "./asignar-menu/asignar-menu.component";

@Component({
  selector: 'app-rol',
  imports: [CommonModule, ReactiveFormsModule, PaginacionComponent, AgregarEditarRolComponent, AsignarMenuComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent implements OnInit {
  formulario!: FormGroup;
  roles: Rol[] = [];
  pagina: number = 1;
  cantidad: number = 10;
  total: number = 0;
  totalPaginas: number = 0;
  modalAbiertoAgregarEditar = false;
  modalAbiertoAsignarPermisos  = false;
  idRolSeleccionado: number = 0;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['']
    });
    this.ObtenerRoles();
  }

  Paginar(page: number) {
    this.pagina = page;
    this.ObtenerRoles();
  }

  ObtenerRoles() {
    const nombre = this.formulario.value.nombre;
    var request: ObtenerRolRequest = {
      termino: nombre,
      cantidad: this.cantidad,
      pagina: this.pagina
    };
    this.rolService.ObtenerRol(request).subscribe(
      (response) => {
        this.roles = response.roles;
        this.pagina = response.pagina;
        this.total = response.total;
        this.totalPaginas = Math.ceil(this.total / this.cantidad);
      }

    )
  }

  abrirModalAgregarEditar(id?: number) {
    this.modalAbiertoAgregarEditar = true;
    if (id) {
      this.idRolSeleccionado = id;
    }
  }

  abrirModalAsignarPermisos(id?: number) {
    this.modalAbiertoAsignarPermisos = true;
    if (id) {
      this.idRolSeleccionado = id;
    }
  }

  cerrarModalAgregarEditar() {
    this.modalAbiertoAgregarEditar = false;
    this.idRolSeleccionado = 0;
    this.ObtenerRoles();
  }

  cerrarModalPermisos() {
    this.modalAbiertoAsignarPermisos = false;
    this.idRolSeleccionado = 0;
    this.ObtenerRoles();
  }

  CambiarEstado(idRol: number) {
    Swal.fire({
      title: "¿Estas seguro de cambiar el estado del rol?",
      text: "El estado del rol, va a cambiar, esta accion es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.EditarEstadoRol(idRol).subscribe(
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
            this.ObtenerRoles();
          }
        )
      }
    });
  }
}