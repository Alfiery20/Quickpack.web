import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolService } from '../../../../core/services/rol.service';
import { RegistrarRolRequest } from '../../../../core/models/RegistrarRol/RegistrarRolRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-rol',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-rol.component.html',
  styleUrl: './agregar-editar-rol.component.scss'
})
export class AgregarEditarRolComponent implements OnInit {

  titulo: string = 'Agregar';
  esEditar: boolean = false;

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService
  ) {
  }
  ngOnInit(): void {
    if (this.esEditar) {
      this.titulo = 'Editar';
    }

    this.formulario = this.fb.group({
      nombre: ['']
    });
  }

  nombreRol: string = '';

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {
    if (!this.esEditar) {
      this.AgregarRol();
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
            text: "Rol registrado con exito!",
            icon: "success"
          });
          this.onClose();
        }
      }
    );
  }
}
