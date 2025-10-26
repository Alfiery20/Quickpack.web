import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../../../core/services/producto.service';
import { VerFichaTecnicaResponse } from '../../../../core/models/Producto/VerFichaTecnica/VerFichaTecnicaResponse';
import { AgregarFichaTecnicaRequest } from '../../../../core/models/Producto/AgregarFichaTecnica/AgregarFichaTecnicaRequest';
import Swal from 'sweetalert2';
import { EditarFichaTecnicaRequest } from '../../../../core/models/Producto/EditarFichaTecnica/EditarFichaTecnicaRequest';

@Component({
  selector: 'app-agregar-editar-ficha-tecnica',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-ficha-tecnica.component.html',
  styleUrl: './agregar-editar-ficha-tecnica.component.scss'
})
export class AgregarEditarFichaTecnicaComponent implements OnChanges, OnInit {
  titulo: string = 'Agregar';

  @Input() isOpen: boolean = false;
  @Input() idProducto: number = 0;
  @Output() close = new EventEmitter<void>();

  formulario!: FormGroup;

  fichaTecnicaSeleccionada: VerFichaTecnicaResponse = {} as VerFichaTecnicaResponse;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService) {
  }

  onClose() {
    this.close.emit();
    this.isOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      this.formulario = this.fb.group({
        largoCamara: [],
        anchoCamara: [],
        altoCamara: [],

        largoMaquina: [],
        anchoMaquina: [],
        altoMaquina: [],

        // limiteInferior: [],
        // limiteSuperior: [],

        barraSellado: [],
        capacidadBomba: [],

        cicloInferior: [],
        cicloSuperior: [],

        peso: [],

        potencia: [],

        placaInsercion: [],

        sistemaControl: [''],
        deteccionVacio: [''],
        deteccionCarne: [''],
        softair: [''],
        controlLiquidos: [''],
      });

      this.VerFichaTecnica();
    }
  }

  ngOnInit(): void {

  }

  VerFichaTecnica() {
    this.productoService.VerFichaTecnica(this.idProducto).subscribe(
      (response) => {
        this.fichaTecnicaSeleccionada = response;

        if (this.fichaTecnicaSeleccionada.id === 0) {
          return;
        }

        this.formulario.patchValue({
          largoCamara: this.fichaTecnicaSeleccionada.largoCamara,
          anchoCamara: this.fichaTecnicaSeleccionada.anchoCamara,
          altoCamara: this.fichaTecnicaSeleccionada.altoCamara,

          largoMaquina: this.fichaTecnicaSeleccionada.largoMaquina,
          anchoMaquina: this.fichaTecnicaSeleccionada.anchoMaquina,
          altoMaquina: this.fichaTecnicaSeleccionada.altoMaquina,
          // limiteInferior: this.fichaTecnicaSeleccionada.cicloInferior,
          // limiteSuperior: this.fichaTecnicaSeleccionada.cicloSuperior,
          barraSellado: this.fichaTecnicaSeleccionada.barraSellado,
          capacidadBomba: this.fichaTecnicaSeleccionada.capacidadBomba,
          cicloInferior: this.fichaTecnicaSeleccionada.cicloInferior,
          cicloSuperior: this.fichaTecnicaSeleccionada.cicloSuperior,
          peso: this.fichaTecnicaSeleccionada.peso,
          potencia: this.fichaTecnicaSeleccionada.potencia,
          placaInsercion: this.fichaTecnicaSeleccionada.placaInsercion,
          sistemaControl: this.fichaTecnicaSeleccionada.sistemaControl,
          deteccionVacio: this.fichaTecnicaSeleccionada.deteccionVacioFinal,
          deteccionCarne: this.fichaTecnicaSeleccionada.deteccionCarne,
          softair: this.fichaTecnicaSeleccionada.softAir,
          controlLiquidos: this.fichaTecnicaSeleccionada.controlLiquidos,
        });
      }
    );
  }

  OnSave() {
    if (this.fichaTecnicaSeleccionada.id === 0) {
      this.Guardar();
    } else {
      this.Editar();
    }
  }

  Guardar() {
    var nuevaFichaTecnica: AgregarFichaTecnicaRequest = {
      idProducto: this.idProducto,
      largoCamara: this.formulario.value.largoCamara,
      anchoCamara: this.formulario.value.anchoCamara,
      altoCamara: this.formulario.value.altoCamara,
      largoMaquina: this.formulario.value.largoMaquina,
      anchoMaquina: this.formulario.value.anchoMaquina,
      altoMaquina: this.formulario.value.altoMaquina,
      barraSellado: this.formulario.value.barraSellado,
      capacidadBomba: this.formulario.value.capacidadBomba,
      cicloInferior: this.formulario.value.cicloInferior,
      cicloSuperior: this.formulario.value.cicloSuperior,
      peso: this.formulario.value.peso,
      potencia: this.formulario.value.potencia,
      placaInsercion: this.formulario.value.placaInsercion,
      sistemaControl: this.formulario.value.sistemaControl,
      deteccionVacioFinal: this.formulario.value.deteccionVacio,
      deteccionCarne: this.formulario.value.deteccionCarne,
      softAir: this.formulario.value.softair,
      controlLiquidos: this.formulario.value.controlLiquidos
    };

    this.productoService.RegistrarFichaTecnica(nuevaFichaTecnica).subscribe(
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
    );
  }

  Editar() {
    var nuevaFichaTecnica: EditarFichaTecnicaRequest = {
      idProducto: this.idProducto,
      largoCamara: this.formulario.value.largoCamara,
      anchoCamara: this.formulario.value.anchoCamara,
      altoCamara: this.formulario.value.altoCamara,
      largoMaquina: this.formulario.value.largoMaquina,
      anchoMaquina: this.formulario.value.anchoMaquina,
      altoMaquina: this.formulario.value.altoMaquina,
      barraSellado: this.formulario.value.barraSellado,
      capacidadBomba: this.formulario.value.capacidadBomba,
      cicloInferior: this.formulario.value.cicloInferior,
      cicloSuperior: this.formulario.value.cicloSuperior,
      peso: this.formulario.value.peso,
      potencia: this.formulario.value.potencia,
      placaInsercion: this.formulario.value.placaInsercion,
      sistemaControl: this.formulario.value.sistemaControl,
      deteccionVacioFinal: this.formulario.value.deteccionVacio,
      deteccionCarne: this.formulario.value.deteccionCarne,
      softAir: this.formulario.value.softair,
      controlLiquidos: this.formulario.value.controlLiquidos
    };

    this.productoService.EditarFichaTecnica(nuevaFichaTecnica).subscribe(
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
    );
  }

  ResetearFormulario() {
    this.fichaTecnicaSeleccionada = {} as VerFichaTecnicaResponse;
    this.formulario.reset({
      largoCamara: '',
      anchoCamara: '',
      altoCamara: '',
      largoMaquina: '',
      anchoMaquina: '',
      altoMaquina: '',
      barraSellado: '',
      capacidadBomba: '',
      cicloInferior: '',
      cicloSuperior: '',
      peso: '',
      potencia: '',
      placaInsercion: '',
      sistemaControl: '',
      deteccionVacio: '',
      deteccionCarne: '',
      softair: '',
      controlLiquidos: ''
    });
  }
}
