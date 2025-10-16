import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { AgregarCaracteristicaRequest } from '../../../../core/models/Categoria/AgregarCaracteristica/AgregarCaracteristicaRequest';
import { constants } from '../../../../core/models/utils/contants';
import Swal from 'sweetalert2';
import { ObtenerCaracteristicaResponse } from '../../../../core/models/Categoria/ObtenerCaracteristica/ObtenerCaracteristicaResponse';

@Component({
  selector: 'app-agregar-editar-caracteristica',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-caracteristica.component.html',
  styleUrl: './agregar-editar-caracteristica.component.scss'
})
export class AgregarEditarCaracteristicaComponent implements OnChanges, OnInit {

  @Input() isOpen: boolean = false;
  @Input() idCategoria: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  archivoSeleccionado!: File;

  previewUrl: string | null = null;
  isImage = false;
  isVideo = false;

  caracteristicas: ObtenerCaracteristicaResponse[] = []

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      this.formulario = this.fb.group({
        nombre: [''],
        descripcion: [''],
        archivo: []
      });
      this.obtenerCaracteristica();
    }
  }

  ResetearFormulario() {
    this.formulario.reset({
      nombre: '',
      descripcion: '',
      archivo: null
    });

    this.previewUrl = null;
    this.isImage = false;
    this.isVideo = false;
    this.archivoSeleccionado = {} as File;
  }

  obtenerCaracteristica() {
    this.categoriaService.ObtenerCaracteristica(this.idCategoria).subscribe(
      (response) => {
        this.caracteristicas = response;
      }
    )
  }

  EliminarCaracteristica(id: number) {
    this.categoriaService.EliminarCaracteristica(id).subscribe(
      (response) => {
        if (response.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: response.mensaje,
            icon: "success"
          });
          this.obtenerCaracteristica();
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

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  async onSave() {

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

    const request: AgregarCaracteristicaRequest = {
      idCategoria: this.idCategoria,
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      archivo: archivoBase64
    };

    this.categoriaService.RegistrarCaracteristica(request).subscribe(
      (response) => {
        if (response.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: response.mensaje,
            icon: "success"
          });
          this.ResetearFormulario()
          this.obtenerCaracteristica();
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
    var nombre: string = this.formulario.value.nombre
    var descripcion: string = this.formulario.value.descripcion
    var archivo: number = this.formulario.value.archivo

    return (nombre.length > 0) && (descripcion.length > 0) && (archivo)
  }

  onSeleccionarArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;

        this.isImage = file.type.startsWith('image/');
        this.isVideo = file.type.startsWith('video/');
      };

      reader.readAsDataURL(file);
    }
  }
}
