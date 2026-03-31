import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnviarCorreoConsultaRequest } from '../../../core/models/Landing/EnviarCorreoConsulta/EnviarCorreoConsultaRequest';
import { LandingService } from '../../../core/services/landing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactanos',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.scss'
})
export class ContactanosComponent implements OnInit {

  @Input() verMapa?: boolean = true;
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private landingService: LandingService
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      producto: [''],
      nombre: [''],
      emeal: [''],
      telefono: [''],
      empresa: [''],
      poblacion: [''],
      mensaje: [''],
      acepto: [false]
    });
  }

  enviarCorreo() {
    var request: EnviarCorreoConsultaRequest = {
      producto: this.formulario.value.producto,
      nombreCompleto: this.formulario.value.nombre,
      correo: this.formulario.value.emeal,
      telefono: this.formulario.value.telefono,
      empresa: this.formulario.value.empresa,
      poblacion: this.formulario.value.poblacion,
      mensaje: this.formulario.value.mensaje
    }

    this.landingService.EnviarCorreoConsulta(request).subscribe(
      (request) => {
        if (request.codigo == 'OK') {
          Swal.fire({
            title: "Conforme!",
            text: request.mensaje,
            icon: "success"
          });
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
    var telefono = this.formulario.value.telefono;

    return (telefono.length > 0)
  }
}
