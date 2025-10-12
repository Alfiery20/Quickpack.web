import { Component } from '@angular/core';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { IniciarSesionRequest } from '../../../core/models/Autorizacion/IniciarSesion/IniciarSesionRequest';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private localStorageService: LocalStorageService
  ) {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.invalid) return;
    this.IniciarSesion();
  }

  IniciarSesion() {
    var userLogin: IniciarSesionRequest = {
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave,
    };

    this.autenticacionService.IniciarSesion(userLogin).subscribe(
      (response) => {
        if (response.token != '' && response.token != null) {
          this.localStorageService.setItem('token', response.token);
          this.localStorageService.setItem('usuario', JSON.stringify(response));
          this.router.navigate(['/intranet']);
          Swal.fire({
            title: "Bienvenido!",
            text: "Inicio de sesión exitoso!",
            icon: "success",
            // iconColor: "#991b1b", // bg-red-800
            confirmButtonColor: "var(--rojo-quickpack)" // bg-red-800
          });

        } else {
          Swal.fire({
            title: "Ups!",
            text: "Credenciales invalidas!",
            icon: "error",
            // iconColor: "#991b1b", // bg-red-800
            confirmButtonColor: "var(--rojo-quickpack)" // bg-red-800
          });
        }
      }
    )
  }

}
