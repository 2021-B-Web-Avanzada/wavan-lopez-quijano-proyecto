import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProvinciaAPIService} from "../../servicios/api/provincia/provincia-api.service";
import {ProvinciaModelo} from "../../modelos/provincia.modelo";

@Component({
  selector: 'app-ruta-registrarse',
  templateUrl: './ruta-registrarse.component.html',
  styleUrls: ['./ruta-registrarse.component.scss']
})
export class RutaRegistrarseComponent implements OnInit {

  formGroup?: FormGroup;
  listaProvincias: ProvinciaModelo[] | null = []

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly provinciaAPI: ProvinciaAPIService
  ) { }

  ngOnInit(): void {
    this.prepararFormulario()
    this.prepararInformacion()
  }

  prepararFormulario(){
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl( {
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
      },[
        Validators.required,
        Validators.minLength(10)
      ]),
      contrasenaConfirmacion: new FormControl({
        value:'',
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

  prepararInformacion(){
    const valor = this.provinciaAPI.readProvincias()
      .then(queryProvincia => {
        if (queryProvincia.error === null ){
          this.listaProvincias = queryProvincia.data
        }
      })
  }

  validarContrasena() : Boolean{
    const contrasena = this.formGroup?.get('contrasena')?.value;
    const contrasenaConfirmacion = this.formGroup?.get('contrasenaConfirmacion')?.value;
    return contrasena === contrasenaConfirmacion;

  }
  registrarse(){
    if (this.validarContrasena()){

    }
  }
}
