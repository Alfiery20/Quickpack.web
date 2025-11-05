import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  formulario!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private landingService: LandingService
  ) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      tipoMensaje: ['0'],
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
      tipoSolicitud: this.formulario.value.tipoMensaje,
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
    var tipoSolicitud = this.formulario.value.tipoMensaje;
    var nombreCompleto = this.formulario.value.nombre;
    var correo = this.formulario.value.emeal;
    var telefono = this.formulario.value.telefono;
    var empresa = this.formulario.value.empresa;
    var poblacion = this.formulario.value.poblacion;
    var mensaje = this.formulario.value.mensaje
    var acepto = this.formulario.value.acepto
    console.log({
      tipoSolicitud, 
      nombreCompleto,
      correo,
      telefono, 
      empresa,
      poblacion,
      mensaje,
      acepto
    });
    

    return (tipoSolicitud.length > 0) && (nombreCompleto.length > 0) && (correo.length > 0) &&
      (telefono.length > 0) && (empresa.length > 0) && (poblacion.length > 0) && (mensaje.length > 0) && (acepto)
  }
}
