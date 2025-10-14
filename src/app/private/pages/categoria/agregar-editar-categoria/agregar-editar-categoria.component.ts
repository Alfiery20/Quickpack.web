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
        idTipoProducto: [0]
      });

      if (this.idCategoria != 0) {
        this.categoriaService.VerCategoria(this.idCategoria).subscribe(
          (response) => {
            this.categoriaSeleccionada = response;
            this.formulario = this.fb.group({
              nombre: [this.categoriaSeleccionada.nombre],
              descripcion: [this.categoriaSeleccionada.descripcion],
              idTipoProducto: [this.categoriaSeleccionada.idTipoProducto]
            });
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

  AgregarCategoria() {
    var request: AgregarCategoriaRequest = {
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
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

  EditarCategoria() {
    var request: EditarCategoriaRequest = {
      idCategoria: this.idCategoria,
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
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

  ValidarFormulario() {
    var nombre: string = this.formulario.value.nombre
    var descripcion: string = this.formulario.value.descripcion
    var idTipoProducto: number = this.formulario.value.idTipoProducto

    return (nombre.length > 0) && (descripcion.length > 0) && (idTipoProducto > 0)
  }

}