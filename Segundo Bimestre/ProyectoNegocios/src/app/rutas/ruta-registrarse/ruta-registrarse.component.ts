import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProvinciaAPIService} from "../../servicios/api/provincia/provincia-api.service";
import {ProvinciaModelo} from "../../modelos/provincia.modelo";
import {UsuarioModelo} from "../../modelos/usuario.modelo";
import {UsuarioAPIService} from "../../servicios/api/usuario/usuario-api.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ruta-registrarse',
  templateUrl: './ruta-registrarse.component.html',
  styleUrls: ['./ruta-registrarse.component.scss']
})
export class RutaRegistrarseComponent implements OnInit {

  formGroup?: FormGroup;
  listaProvincias: ProvinciaModelo[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly provinciaAPI: ProvinciaAPIService,
    private readonly usuarioAPI: UsuarioAPIService
  ) {
  }

  ngOnInit(): void {
    this.prepararFormulario()
    this.prepararInformacion()
  }

  prepararFormulario() {
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(10)
      ]),
      contrasena: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(5)
      ]),
      fecha: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      correo: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(10)
      ]),
      contrasenaConfirmacion: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(5)
      ]),
      genero: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      provincia: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    })
  }

  prepararInformacion() {
    const valor = this.provinciaAPI.readProvincias()
      .then(queryProvincias => {
        if (queryProvincias.error === null) {
          this.listaProvincias = queryProvincias.data as ProvinciaModelo[];
        }
      })
  }

  validarContrasena(): Boolean {
    const contrasena = this.formGroup?.get('contrasena')?.value;
    const contrasenaConfirmacion = this.formGroup?.get('contrasenaConfirmacion')?.value;
    return contrasena === contrasenaConfirmacion;
  }

  registrarse() {
    if (this.validarContrasena()) {
      const nombre = this.formGroup?.get('nombre')?.value;
      const contrasena = this.formGroup?.get('contrasena')?.value;
      const fechaNacimiento = this.formGroup?.get('fecha')?.value;
      const correo = this.formGroup?.get('correo')?.value;
      const genero = this.formGroup?.get('genero')?.value;
      const provincia = this.formGroup?.get('provincia')?.value;
      const usuarioNuevo: UsuarioModelo = {
        nombre_completo: nombre,
        correo_electronico: correo,
        fotografia: 'https://www.10wallpaper.com/wallpaper/1366x768/2005/Night_city_glow_lights_2020_HD_Photography_1366x768.jpg',
        fecha_nacimiento: fechaNacimiento,
        genero: genero,
        provincia_residencia: provincia,
        negocios_registrados: 0,
        contrasena: contrasena,
        rol: 'Usuario'
      }
      this.usuarioAPI.createUsuario(usuarioNuevo)
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
              title: 'Usuario creado exitosamente'
            })
            this.router.navigate(['/login'])
          }
        )
    } else {
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
        title: 'Las contraseñas no son las mismas'
      })
    }
  }
}
