import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsuarioAPIService} from "../../servicios/api/usuario/usuario-api.service";

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  formGroup?: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly usuarioAPI: UsuarioAPIService
  ) { }

  ngOnInit(): void {
    this.prepararFormulario()
  }

  prepararFormulario(){
    this.formGroup = this.formBuilder.group({
      correo: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(10),
      ]),
      contrasena: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  iniciarSesion(){
    const correo = this.formGroup?.get('correo')?.value;
    const contrasena = this.formGroup?.get('contrasena')?.value;

    const valor = this.usuarioAPI.readUsuarioPorCorreoYContrasena(correo,contrasena)
      .then(queryUsuario => {
        if( queryUsuario.error != null ){
          alert("Su contraseña o usuario se encuentran incorrectos.")
        } else {
          if(queryUsuario.data?.rol == 'Usuario'){
            this.router.navigate(["/mapa"], { state: { usuario: queryUsuario.data } });
          } else {
            //TODO: PONER LA PANTALLA A LA QUE SE DIRIGE EL ADMIN
            this.router.navigate(["/misNegocios"])
          }
        }
      })
  }

}
