import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { VerProductoResponse } from '../../../../core/models/Producto/VerProducto/VerProductoResponse';
import { ObtenerCategoriaMenuResponse } from '../../../../core/models/Categoria/ObtenerCategoriaMenu/ObtenerCategoriaMenuResponse';
import Swal from 'sweetalert2';
import { constants } from '../../../../core/models/utils/contants';
import { AgregarProductoRequest } from '../../../../core/models/Producto/AgregarProducto/AgregarProductoRequest';
import { EditarProductoRequest } from '../../../../core/models/Producto/EditarProducto/EditarProductoRequest';

@Component({
  selector: 'app-agregar-editar-producto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-producto.component.html',
  styleUrl: './agregar-editar-producto.component.scss'
})
export class AgregarEditarProductoComponent implements OnChanges, OnInit {

  titulo: string = 'Agregar';

  @Input() isOpen: boolean = false;
  @Input() idProducto: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  productoSeleccionado: VerProductoResponse = {} as VerProductoResponse;

  categoriasMenu: ObtenerCategoriaMenuResponse[] = [];

  archivoSeleccionado!: File;

  previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      this.formulario = this.fb.group({
        nombre: [''],
        descripcion: [''],
        idCategoria: [0],
        precio: [0],
        archivo: []
      });

      if (this.idProducto != 0) {
        this.productoService.VerProducto(this.idProducto).subscribe(
          (response) => {
            this.productoSeleccionado = response;
            this.formulario = this.fb.group({
              nombre: [this.productoSeleccionado.nombre],
              descripcion: [this.productoSeleccionado.descripcion],
              idCategoria: [this.productoSeleccionado.idCategoria],
              precio: [this.productoSeleccionado.precio],
              archivo: []
            });
            this.previewUrl = response.multimedia ?? null;

            const fileType = response.multimedia ? response.multimedia.split(';')[0] : '';
            // this.isImage = fileType.startsWith('data:image/');
          });
      }
    }
  }

  ngOnInit(): void {
    this.categoriaService.ObtenerCategoriaMenu().subscribe(
      (response) => {
        this.categoriasMenu = response;
      }
    )
  }

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {
    if (this.idProducto == 0) {
      this.AgregarProducto();
    } else {
      this.EditarProducto();
    }
  }

  async AgregarProducto() {
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

    const request: AgregarProductoRequest = {
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      idCategoria: this.formulario.value.idCategoria,
      precio: this.formulario.value.precio,
      multimedia: archivoBase64
    };

    this.productoService.RegistrarProducto(request).subscribe(
      (response) => {
        if (response.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: response.mensaje,
            icon: "success"
          });
          this.ResetearFormulario()
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

  async EditarProducto() {
    const base64 = new constants();
    var archivoBase64 = this.productoSeleccionado.multimedia ?? '';
    if (this.archivoSeleccionado) {
      archivoBase64 = await base64.encryptToBase64(this.archivoSeleccionado);
    }

    const request: EditarProductoRequest = {
      id: this.idProducto,
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      idCategoria: this.formulario.value.idCategoria,
      precio: this.formulario.value.precio,
      multimedia: archivoBase64
    };

    this.productoService.EditarProducto(request).subscribe(
      (response) => {
        if (response.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: response.mensaje,
            icon: "success"
          });
          this.ResetearFormulario()
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

  ResetearFormulario() {
    this.formulario.reset({
      nombre: '',
      descripcion: '',
      idCategoria: 0,
      precio: 0,
      archivo: null
    });

    this.previewUrl = null;
    this.archivoSeleccionado = {} as File;
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
    var idCategoria: number = this.formulario.value.idCategoria

    return (nombre.length > 0) && (descripcion.length > 0) && (idCategoria > 0)
  }
}
