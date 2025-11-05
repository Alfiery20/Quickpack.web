import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { VerCategoriaResponse } from '../../../../core/models/Categoria/VerCategoria/VerCategoriaResponse';
import { AgregarCategoriaRequest } from '../../../../core/models/Categoria/AgregarCategoria/AgregarCategoriaRequest';
import { EditarCategoriaRequest } from '../../../../core/models/Categoria/EditarCategoria/EditarCategoriaRequest';
import { TipoProductoComponent } from '../../tipo-producto/tipo-producto.component';
import { ObtenerTipoProductoMenuResponse } from '../../../../core/models/TipoProducto/ObtenerTipoProductoMenu/ObtenerTipoProductoMenuResponse';
import { TipoProductoService } from '../../../../core/services/tipo-producto.service';
import { constants } from '../../../../core/models/utils/contants';

@Component({
  selector: 'app-agregar-editar-categoria',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-categoria.component.html',
  styleUrl: './agregar-editar-categoria.component.scss'
})
export class AgregarEditarCategoriaComponent implements OnChanges, OnInit {

  titulo: string = 'Agregar';

  @Input() isOpen: boolean = false;
  @Input() idCategoria: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  categoriaSeleccionada: VerCategoriaResponse = {} as VerCategoriaResponse;

  tipoProductos: ObtenerTipoProductoMenuResponse[] = [];

  archivoSeleccionado!: File;

  previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private tipoProductoService: TipoProductoService
  ) {
  }
  ngOnInit(): void {
    this.tipoProductoService.ObtenerTipoProductoMenu().subscribe(
      (response) => {
        this.tipoProductos = response;
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      this.formulario = this.fb.group({
        nombre: [''],
        descripcion: [''],
        idTipoProducto: [0],
        multimedia: []
      });

      if (this.idCategoria != 0) {
        this.categoriaService.VerCategoria(this.idCategoria).subscribe(
          (response) => {
            this.categoriaSeleccionada = response;
            this.formulario = this.fb.group({
              nombre: [this.categoriaSeleccionada.nombre],
              descripcion: [this.categoriaSeleccionada.descripcion],
              idTipoProducto: [this.categoriaSeleccionada.idTipoProducto],
              multimedia: []
            });
            this.previewUrl = response.multimedia ?? null;

            const fileType = response.multimedia ? response.multimedia.split(';')[0] : '';
          });
      }
    }
  }

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {
    if (this.idCategoria == 0) {
      this.AgregarCategoria();
    } else {
      this.EditarCategoria();
    }
  }

  async AgregarCategoria() {
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

    var request: AgregarCategoriaRequest = {
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      multimedia: archivoBase64,
      idTipoProducto: this.formulario.value.idTipoProducto
    };
    this.categoriaService.RegistrarCategoria(request).subscribe(
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

  async EditarCategoria() {
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

    var request: EditarCategoriaRequest = {
      idCategoria: this.idCategoria,
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      multimedia: archivoBase64,
      idTipoProducto: this.formulario.value.idTipoProducto
    };
    this.categoriaService.EditarCategoria(request).subscribe(
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


  ValidarFormulario() {
    var nombre: string = this.formulario.value.nombre
    var descripcion: string = this.formulario.value.descripcion
    var idTipoProducto: number = this.formulario.value.idTipoProducto

    return (nombre.length > 0) && (descripcion.length > 0) && (idTipoProducto > 0)
  }

}