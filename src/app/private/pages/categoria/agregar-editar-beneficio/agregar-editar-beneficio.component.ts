import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { CommonModule } from '@angular/common';
import { AgregarBeneficipRequest, Beneficio } from '../../../../core/models/Categoria/AgregarBeneficio/AgregarBeneficipRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-beneficio',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './agregar-editar-beneficio.component.html',
  styleUrl: './agregar-editar-beneficio.component.scss'
})
export class AgregarEditarBeneficioComponent implements OnChanges, OnInit {
  @Input() isOpen: boolean = false;
  @Input() idCategoria: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  beneficios: Beneficio[] = [];

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
        descripcion: [''],
        nuevoBeneficio: ['']
      });

      if (this.idCategoria != 0) {
        this.categoriaService.ObtenerBeneficio(this.idCategoria).subscribe(
          (response) => {
            this.formulario.get('descripcion')?.setValue(response.descripcion);
            this.beneficios = response.beneficios
          }
        )
      }
    }
  }

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  onSave() {
    var registrarBeneficios: AgregarBeneficipRequest = {
      idCategoria: this.idCategoria,
      descripcion: this.formulario.value.descripcion,
      beneficios: this.beneficios
    }

    this.categoriaService.RegistrarBeneficio(registrarBeneficios).subscribe(
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
    var descripcion: string = this.formulario.value.descripcion

    return (descripcion.length > 0) && (this.beneficios.length > 0)
  }

  AgregarBeneficio() {
    var nuevoBeneficio = this.formulario.value.nuevoBeneficio
    if (nuevoBeneficio.trim() !== '') {
      var beneficio: Beneficio = {
        nombre: nuevoBeneficio.trim()
      }
      this.beneficios.push(beneficio);
      this.formulario.get('nuevoBeneficio')?.setValue('');
    }
  }

  EliminarBeneficio(beneficio: Beneficio) {
    const idx = this.beneficios.indexOf(beneficio);
    if (idx > -1) {
      this.beneficios.splice(idx, 1);
    }
  }

}
