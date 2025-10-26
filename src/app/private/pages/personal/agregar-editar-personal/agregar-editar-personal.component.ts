import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../../core/services/rol.service';
import { ObtenerRolMenuResponse } from '../../../../core/models/Rol/ObtenerRolMenu/ObtenerRolMenuResponse';
import { VerPersonalResponse } from '../../../../core/models/Empleado/VerPersonal/VerPersonalResponse';
import { RegistrarEmpleadoRequest } from '../../../../core/models/Empleado/RegistrarEmpleado/RegistrarEmpleadoRequest';
import Swal from 'sweetalert2';
import { EditarEmpleadoRequest } from '../../../../core/models/Empleado/EditarEmpleado/EditarEmpleadoRequest';

@Component({
  selector: 'app-agregar-editar-personal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-personal.component.html',
  styleUrl: './agregar-editar-personal.component.scss'
})
export class AgregarEditarPersonalComponent implements OnChanges, OnInit {

  titulo: string = 'Agregar';

  @Input() isOpen: boolean = false;
  @Input() idEmpledo: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;
  rolMenu: ObtenerRolMenuResponse[] = [];

  personalSeleccionado: VerPersonalResponse = {} as VerPersonalResponse;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private rolService: RolService
  ) {
  }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.isOpen) {
      return;
    } else {
      this.formulario = this.fb.group({
        tipoDocumento: ['0'],
        nroDocumento: [''],
        nombre: [''],
        apellidoPaterno: [''],
        apellidoMaterno: [''],
        telefono: [''],
        correo: [''],
        clave: [''],
        rol: ['']
      });
    }

    this.rolService.ObtenerRolMenu().subscribe(
      (response) => {
        this.rolMenu = response;
        if (this.idEmpledo != 0) {
          this.titulo = 'Editar';
          this.empleadoService.VerEmpleado(this.idEmpledo).subscribe(
            (response) => {
              this.personalSeleccionado = response;
              console.log(this.personalSeleccionado);
              console.log(this.formulario.value);


              this.formulario = this.fb.group({
                tipoDocumento: [{ value: this.personalSeleccionado.tipoDocumento, disabled: true }],
                nroDocumento: [{ value: this.personalSeleccionado.numeroDocumento, disabled: true }],
                nombre: [this.personalSeleccionado.nombre],
                apellidoPaterno: [this.personalSeleccionado.apellidoPaterno],
                apellidoMaterno: [this.personalSeleccionado.apellidoMaterno],
                telefono: [this.personalSeleccionado.telefono],
                correo: [this.personalSeleccionado.correo],
                Clave: [{ value: '', disabled: true }],
                rol: [this.personalSeleccionado.rol]
              });
              console.log(this.formulario.value);
            });
        }
      });
  }

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {
    if (this.idEmpledo == 0) {
      this.AgregarEmpleado();
    } else {
      this.EditarEmpleado();
    }
  }

  AgregarEmpleado() {
    var nuevoEmpleado: RegistrarEmpleadoRequest = {
      tipoDocumento: this.formulario.value.tipoDocumento,
      numeroDocumento: this.formulario.value.nroDocumento,
      nombre: this.formulario.value.nombre,
      apellidoPaterno: this.formulario.value.apellidoPaterno,
      apellidoMaterno: this.formulario.value.apellidoMaterno,
      telefono: this.formulario.value.telefono,
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave,
      idRol: this.formulario.value.rol
    }

    this.empleadoService.RegistrarEmpleado(nuevoEmpleado).subscribe(
      (response) => {
        if (response.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: response.mensaje,
            icon: "success"
          });
          this.onClose();
        } else {
          Swal.fire({
            title: "Error!",
            text: response.mensaje,
            icon: "error"
          });
        }
      }
    )
  }

  EditarEmpleado() {
    var editarEmpleado: EditarEmpleadoRequest = {
      idEmpleado: this.idEmpledo,
      nombre: this.formulario.value.nombre,
      apellidoPaterno: this.formulario.value.apellidoPaterno,
      apellidoMaterno: this.formulario.value.apellidoMaterno,
      telefono: this.formulario.value.telefono,
      idRol: this.formulario.value.rol
    }

    this.empleadoService.EditarEmpleado(editarEmpleado).subscribe(
      (response) => {
        if (response.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: response.mensaje,
            icon: "success"
          });
          this.onClose();
        } else {
          Swal.fire({
            title: "Error!",
            text: response.mensaje,
            icon: "error"
          });
        }
      }
    )
  }

  ValidarFormulario() {
    var tipoDocumento: string = this.formulario.getRawValue().tipoDocumento
    var nroDocumento: string = this.formulario.getRawValue().nroDocumento
    var nombre: string = this.formulario.value.nombre
    var apellidoPaterno: string = this.formulario.value.apellidoPaterno
    var apellidoMaterno: string = this.formulario.value.apellidoMaterno
    var telefono: string = this.formulario.value.telefono
    var correo: string = this.formulario.value.correo
    var clave: string = this.idEmpledo != 0 ? "" : this.formulario.getRawValue().clave;
    var rol: number = this.formulario.value.rol

    console.log(nroDocumento);


    return (tipoDocumento != "0") && (nroDocumento.length > 0) &&
      (nombre.length > 0) && (apellidoPaterno.length > 0) &&
      (apellidoMaterno.length > 0) && (telefono.length > 0) &&
      (correo.length > 0) && (this.idEmpledo != 0 || clave.length > 0) &&
      (rol > 0)
  }

}
