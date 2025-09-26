import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolService } from '../../../../core/services/rol.service';
import { RegistrarRolRequest } from '../../../../core/models/RegistrarRol/RegistrarRolRequest';
import Swal from 'sweetalert2';
import { VerRolResponse } from '../../../../core/models/VerRol/VerRolResponse';
import { EditarRolRequest } from '../../../../core/models/EditarRol/EditarRolRequest';

@Component({
  selector: 'app-agregar-editar-rol',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-rol.component.html',
  styleUrl: './agregar-editar-rol.component.scss'
})
export class AgregarEditarRolComponent implements OnChanges {

  titulo: string = 'Agregar';

  @Input() isOpen: boolean = false;
  @Input() idRol: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  rolSeleccionado: VerRolResponse = {} as VerRolResponse;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formulario = this.fb.group({
      nombre: ['']
    });

    if (this.idRol != 0) {
      this.titulo = 'Editar';
      this.rolService.VerRol(this.idRol).subscribe(
        (response) => {
          this.rolSeleccionado = response;
          this.formulario = this.fb.group({
            nombre: [this.rolSeleccionado.nombre]
          });
        });
    }


  }

  nombreRol: string = '';

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {    
    if (this.idRol == 0) {
      this.AgregarRol();
    }else {
      this.EditarRol();
    }
  }

  AgregarRol() {
    var request: RegistrarRolRequest = {
      nombre: this.formulario.value.nombre
    };
    this.rolService.RegistrarRol(request).subscribe(
      (request) => {
        if (request.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: request.mensaje,
            icon: "success"
          });
          this.onClose();
        }
      }
    );
  }

  EditarRol() {
    var request: EditarRolRequest = {
      idRol: this.idRol,
      nombre: this.formulario.value.nombre
    };
    this.rolService.EditarRol(request).subscribe(
      (request) => {
        if (request.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: request.mensaje,
            icon: "success"
          });
          this.onClose();
        }
      }
    );
  }
}
