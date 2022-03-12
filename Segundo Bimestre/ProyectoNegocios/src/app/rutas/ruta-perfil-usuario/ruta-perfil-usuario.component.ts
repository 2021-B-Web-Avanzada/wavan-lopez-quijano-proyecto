import { Component, OnInit } from '@angular/core';
import {UsuarioModelo} from "../../modelos/usuario.modelo";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioAPIService} from "../../servicios/api/usuario/usuario-api.service";
import {ProvinciaModelo} from "../../modelos/provincia.modelo";
import {ProvinciaAPIService} from "../../servicios/api/provincia/provincia-api.service";
import Swal from "sweetalert2";
import {AuthService} from "../../servicios/autenticacion/autenticacion.service";

@Component({
  selector: 'app-ruta-perfil-usuario',
  templateUrl: './ruta-perfil-usuario.component.html',
  styleUrls: ['./ruta-perfil-usuario.component.scss']
})
export class RutaPerfilUsuarioComponent implements OnInit {

  usuario_actual?: UsuarioModelo;
  listaProvincias : ProvinciaModelo[] = []
  formGroup?: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly usuarioAPIService: UsuarioAPIService,
    private readonly provinciaAPI: ProvinciaAPIService,
    private readonly router:Router,
    public readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    // Parámetros de consulta
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id_usuario = params['id_usuario'];
        // Consulta a la BD
        this.consultarUsuario(id_usuario);
      }
    })
    this.prepararInformacion()
  }

  prepararInformacion(){
    const valor = this.provinciaAPI.readProvincias()
      .then(queryProvincias => {
        if (queryProvincias.error === null ){
          this.listaProvincias = queryProvincias.data as ProvinciaModelo[];
        }
      })
  }

  consultarUsuario(id_usuario: number){
    this.usuarioAPIService.readUsuarioPorID(id_usuario)
      .then( queryUsuario => {
        this.usuario_actual = queryUsuario.data as UsuarioModelo;
        this.prepararFormulario()
      })
  }

  prepararFormulario(){
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl({
        value: this.usuario_actual?.nombre_completo,
        disabled: false
      },[
        Validators.required,
        Validators.minLength(10)
      ]),
      correo: new FormControl({
        value: this.usuario_actual?.correo_electronico,
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(10)
      ]),
      fecha: new FormControl({
        value: this.usuario_actual?.fecha_nacimiento,
        disabled: false
      }, [
        Validators.required
      ]),
      genero: new FormControl({
        value: this.usuario_actual?.genero,
        disabled: false
      }, [
        Validators.required
      ]),
      provincia: new FormControl({
        value: this.usuario_actual?.provincia_residencia,
        disabled: false
      }, [
        Validators.required
      ]),
      fotografia: new FormControl({
        value: this.usuario_actual?.fotografia,
        disabled: false
      }, [
        Validators.required
      ]),
    })
  }

  guardarUsuario(){
    const nombre = this.formGroup?.get('nombre')?.value;
    const fechaNacimiento = this.formGroup?.get('fecha')?.value;
    const correo = this.formGroup?.get('correo')?.value;
    const genero = this.formGroup?.get('genero')?.value;
    const provincia = this.formGroup?.get('provincia')?.value;
    const fotografia = this.formGroup?.get('fotografia')?.value;
    const usuarioActualizar : UsuarioModelo = {
      id_usuario: this.usuario_actual?.id_usuario,
      nombre_completo: nombre,
      correo_electronico: correo,
      fotografia: fotografia,
      fecha_nacimiento: fechaNacimiento,
      genero: genero,
      provincia_residencia: provincia,
    }
    this.usuarioAPIService.updateUsuario(usuarioActualizar)
      .then(
        (queryUsuario) => {
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
            icon: 'success',
            title: 'Usuario actualizado exitosamente'
          })
          this.router.navigate(['mapa']);
        }
      )
  }

  verNegocios(){
    this.router.navigate(['/misNegocios'])
  }
}
