import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginacionComponent } from "../../../shared/paginacion/paginacion.component";
import { AgregarEditarRolComponent } from "./agregar-editar-rol/agregar-editar-rol.component";

@Component({
  selector: 'app-rol',
  imports: [CommonModule, ReactiveFormsModule, PaginacionComponent, AgregarEditarRolComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent implements OnInit {
  formulario!: FormGroup;
  categorias: any[] = [];
  categoriasFiltradas: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['']
    });

    // Datos de ejemplo
    this.categorias = [
      { id: 1, nombre: 'Tecnología', estado: 'Activo' },
      { id: 2, nombre: 'Ropa', estado: 'Activo' },
      { id: 3, nombre: 'Hogar', estado: 'Inactivo' },
      { id: 4, nombre: 'Deportes', estado: 'Activo' }
    ];
    this.categoriasFiltradas = [...this.categorias];
  }

  ObtenerCategoria() {
    const nombre = this.formulario.value.nombre?.toLowerCase();
    this.categoriasFiltradas = this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(nombre)
    );
  }

  AgregarCategoria() {
    alert('Abrir modal para agregar categoría 🚀');
  }

  EditarCategoria(id: number) {
    alert('Editar categoría con id: ' + id);
  }

  EliminarCategoria(id: number) {
    alert('Eliminar categoría con id: ' + id);
  }

  modalAbierto = false;

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}