import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RolService } from '../../../../core/services/rol.service';
import { VerTipoProductoResponse } from '../../../../core/models/TipoProducto/VerTipoProducto/VerTipoProductoResponse';
import { CommonModule } from '@angular/common';
import { TipoProductoService } from '../../../../core/services/tipo-producto.service';
import { AgregarTipoProductoRequest } from '../../../../core/models/TipoProducto/AgregarTipoProducto/AgregarTipoProductoRequest';
import { EditarTipoProductoRequest } from '../../../../core/models/TipoProducto/EditarTipoProducto/EditarTipoProductoRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-tipo-producto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-tipo-producto.component.html',
  styleUrl: './agregar-editar-tipo-producto.component.scss'
})
export class AgregarEditarTipoProductoComponent implements OnChanges {
  titulo: string = 'Agregar';

  @Input() isOpen: boolean = false;
  @Input() idTipoProducto: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  tipoProductoSeleccionado: VerTipoProductoResponse = {} as VerTipoProductoResponse;

  constructor(
    private fb: FormBuilder,
    private tipoProductoService: TipoProductoService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formulario = this.fb.group({
      nombre: ['']
    });

    if (this.idTipoProducto != 0) {
      this.titulo = 'Editar';
      this.tipoProductoService.VerTipoProducto(this.idTipoProducto).subscribe(
        (response) => {
          this.tipoProductoSeleccionado = response;
          this.formulario = this.fb.group({
            nombre: [this.tipoProductoSeleccionado.nombre]
          });
        });
    }
  }

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {
    if (this.idTipoProducto == 0) {
      this.AgregarTipoProducto();
    } else {
      this.EditarTipoProducto();
    }
  }

  AgregarTipoProducto() {
    var request: AgregarTipoProductoRequest = {
      nombre: this.formulario.value.nombre
    };
    this.tipoProductoService.RegistrarTipoProducto(request).subscribe(
      (request) => {
        if (request.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: request.mensaje,
            icon: "success"
          });
          this.onClose();
        } else {
          Swal.fire({
            title: "Error!",
            text: request.mensaje,
            icon: "error"
          });
        }
      }
    );
  }

  EditarTipoProducto() {
    var request: EditarTipoProductoRequest = {
      idTipoProducto: this.idTipoProducto,
      nombre: this.formulario.value.nombre
    };
    this.tipoProductoService.EditarTipoProducto(request).subscribe(
      (request) => {
        if (request.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: request.mensaje,
            icon: "success"
          });
          this.onClose();
        } else {
          Swal.fire({
            title: "Error!",
            text: request.mensaje,
            icon: "error"
          });
        }
      }
    );
  }
}
