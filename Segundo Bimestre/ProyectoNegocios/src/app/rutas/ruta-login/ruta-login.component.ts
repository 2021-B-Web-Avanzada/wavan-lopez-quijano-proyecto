import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsuarioAPIService} from "../../servicios/api/usuario/usuario-api.service";
import {AuthService} from "../../servicios/autenticacion/autenticacion.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  formGroup?: FormGroup;

  @Output() infoMenuUsuario = new EventEmitter<{visible: boolean, imagenPerfil: string}>();
  imagenPerfil = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly usuarioAPIService: UsuarioAPIService,
    private readonly autenticacion: AuthService
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

    const valor = this.usuarioAPIService.readUsuarioPorCorreoYContrasena(correo,contrasena)
      .then(queryUsuario => {
        if( queryUsuario.error != null ){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: 'Su contraseña o usuario se encuentran incorrectos'
          })
        } else {
          this.autenticacion.inicioSesion = true;
          this.autenticacion.id_usuario = queryUsuario.data!.id_usuario as number;
          this.autenticacion.rol = queryUsuario.data!.rol as string;
          // Habilitar menú de usuario
          this.imagenPerfil = queryUsuario!.data!.fotografia;
          // Emitir al componente padre
          this.habilitarMenuUsuario();
          // Redireccionar al usuario
          if(queryUsuario.data?.rol == 'Usuario'){
            this.router.navigate(["/mapa"]);
          } else {
            this.router.navigate(["/negociosPendientes"]);
          }
        }
      })
  }

  habilitarMenuUsuario() {
    this.infoMenuUsuario.emit({
      visible: true,
      imagenPerfil: this.imagenPerfil,
    });
  }

}
