import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../../core/services/rol.service';
import { ObtenerRolMenuResponse } from '../../../../core/models/ObtenerRolMenu/ObtenerRolMenuResponse';
import { VerPersonalResponse } from '../../../../core/models/VerPersonal/VerPersonalResponse';
import { RegistrarEmpleadoRequest } from '../../../../core/models/RegistrarEmpleado/RegistrarEmpleadoRequest';
import Swal from 'sweetalert2';
import { EditarEmpleadoRequest } from '../../../../core/models/EditarEmpleado/EditarEmpleadoRequest';

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
    this.formulario = this.fb.group({
      tipoDocumento: ['0'],
      nroDocumento: [''],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      telefono: [''],
      correo: [''],
      clave: [''],
      rol: ['0']
    });

    this.rolService.ObtenerRolMenu().subscribe(
      (response) => {
        this.rolMenu = response;
      });

    if (this.idEmpledo != 0) {
      this.titulo = 'Editar';
      this.empleadoService.VerEmpleado(this.idEmpledo).subscribe(
        (response) => {
          this.personalSeleccionado = response;
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
        });
    }
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
}
