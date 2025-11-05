import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RolService } from '../../../../core/services/rol.service';
import { VerTipoProductoResponse } from '../../../../core/models/TipoProducto/VerTipoProducto/VerTipoProductoResponse';
import { CommonModule } from '@angular/common';
import { TipoProductoService } from '../../../../core/services/tipo-producto.service';
import { AgregarTipoProductoRequest } from '../../../../core/models/TipoProducto/AgregarTipoProducto/AgregarTipoProductoRequest';
import { EditarTipoProductoRequest } from '../../../../core/models/TipoProducto/EditarTipoProducto/EditarTipoProductoRequest';
import Swal from 'sweetalert2';
import { constants } from '../../../../core/models/utils/contants';

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

  archivoSeleccionado!: File;

  previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tipoProductoService: TipoProductoService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formulario = this.fb.group({
      nombre: [''],
      descripcion: [''],
      multimedia: []
    });

    if (this.idTipoProducto != 0) {
      this.titulo = 'Editar';
      this.tipoProductoService.VerTipoProducto(this.idTipoProducto).subscribe(
        (response) => {
          this.tipoProductoSeleccionado = response;
          this.formulario = this.fb.group({
            nombre: [this.tipoProductoSeleccionado.nombre],
            descripcion: [this.tipoProductoSeleccionado.descripcion],
            multimedia: []
          });
          this.previewUrl = response.multimedia ?? null;

          const fileType = response.multimedia ? response.multimedia.split(';')[0] : '';
        });
    }
  }

  onSeleccionarArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
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

  async AgregarTipoProducto() {
    if (!this.archivoSeleccionado) {
      Swal.fire({
        title: "Ups!",
        text: "No se ha seleccionado ningún archivo",
        icon: "warning"
      });
      return;
    }

    const base64 = new constants();
    const archivoBase64 = await base64.encryptToBase64(this.archivoSeleccionado);

    var request: AgregarTipoProductoRequest = {
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      multimedia: archivoBase64
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

  async EditarTipoProducto() {
    if (!this.archivoSeleccionado) {
      Swal.fire({
        title: "Ups!",
        text: "No se ha seleccionado ningún archivo",
        icon: "warning"
      });
      return;
    }

    const base64 = new constants();
    const archivoBase64 = await base64.encryptToBase64(this.archivoSeleccionado);
    var request: EditarTipoProductoRequest = {
      idTipoProducto: this.idTipoProducto,
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      multimedia: archivoBase64

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
