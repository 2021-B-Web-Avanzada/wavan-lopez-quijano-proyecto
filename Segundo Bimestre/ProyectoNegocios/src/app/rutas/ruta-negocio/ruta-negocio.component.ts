import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {ProductoAPIService} from "../../servicios/api/producto/producto-api.service";
import {ProductoModelo} from "../../modelos/producto.modelo";
import {ComentarioAPIService} from "../../servicios/api/comentario/comentario-api.service";
import {ComentarioModelo} from "../../modelos/comentario.modelo";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProvinciaAPIService} from "../../servicios/api/provincia/provincia-api.service";

@Component({
  selector: 'app-ruta-negocio',
  templateUrl: './ruta-negocio.component.html',
  styleUrls: ['./ruta-negocio.component.scss']
})
export class RutaNegocioComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly negocioAPIService: NegocioAPIService,
    private readonly productoAPIService: ProductoAPIService,
    private readonly comentarioAPIService: ComentarioAPIService,
    private readonly provinciaAPIService: ProvinciaAPIService,
    private readonly formBuilder: FormBuilder,
  ) { }

  // Información de la BD
  negocio?: NegocioModelo;
  productos?: ProductoModelo[];
  comentarios?: ComentarioModelo[];

  puntajePromedio?: number;
  cantidadComentarios?: number;
  codigo_telefonico?: number;

  // Escribir comentario
  comentarioFormGroup?: FormGroup;

  ngOnInit(): void {
    // Parámetros de consulta
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id_negocio = params['id_negocio'];
        // Consulta a la BD
        this.consultarDatos(id_negocio);
      }
    })
  }

  consultarDatos(id_negocio: number) {
    this.negocioAPIService.readNegocioPorID(id_negocio)
      .then(queryNegocio => {
        // Obtener datos del negocio
        this.negocio = queryNegocio.data as NegocioModelo;
        // Calcular estrellas
        this.puntajePromedio = this.calcularPuntajePromedio();
        return this.provinciaAPIService.getProvinciaPorID(this.negocio.id_provincia);
      })
      .then(queryProvincia => {
        // Obtener codigo telefonico
        this.codigo_telefonico = queryProvincia.data?.codigo_telefonico;
        // Consultar productos
        return this.productoAPIService.getProductos(this.negocio!.id_negocio);
      })
      .then(queryProductos => {
        // Obtener productos del negocio
        this.productos = queryProductos.data as ProductoModelo[];
        // Consultar comentarios
        return this.comentarioAPIService.readComentarios(this.negocio!.id_negocio);
      })
      .then(queryComentarios => {
        // Obtener comentarios del negocio
        this.comentarios = queryComentarios.data as ComentarioModelo[];
        this.cantidadComentarios = this.comentarios.length;
        // Preparar formulario
        this.prepararFormulario();
      });
  }

  calcularPuntajePromedio(): number {
    const suma_puntajes = this.negocio?.suma_puntajes;
    const cantidad_comentarios = this.negocio?.cantidad_comentarios;
    return Math.round((suma_puntajes as number) / (cantidad_comentarios as number));
  }

  enviarComentario() {
    if (this.comentarioFormGroup?.valid) {
      const texto = this.comentarioFormGroup.get('comentario')?.value as string;
      const hoy = new Date();
      const comentario = {
        id_negocio: this.negocio!.id_negocio,
        // TODO: Obtener ID del usuario al iniciar sesión
        id_usuario: 1,
        titulo: texto.length >= 35? texto.substring(0, 34) : texto,
        mensaje: texto,
        fecha: hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDate(),
        puntaje: this.comentarioFormGroup.get('puntaje')?.value,
      }
      this.comentarioAPIService.createComentario(comentario)
        .then(resultado => {
          // Consultar cambios en los comentarios
          return this.comentarioAPIService.readComentarios(this.negocio!.id_negocio)
        })
        .then(queryComentarios => {
          // Actualizar comentarios
          this.comentarios = queryComentarios.data as ComentarioModelo[];
          // TODO: Calcular los nuevos datos para el negocio
          const nuevaSumaPuntajes = this.comentarios.reduce((ac, comentario) => {
            return ac + comentario.puntaje
          }, 0);
          // Calcular estrellas
          this.cantidadComentarios = this.comentarios.length;
          this.negocio!.suma_puntajes = nuevaSumaPuntajes;
          this.negocio!.cantidad_comentarios = this.cantidadComentarios;
          this.puntajePromedio = this.calcularPuntajePromedio();
          // Actualizar el registro del negocio
          return this.negocioAPIService.updatePuntajesComentariosNegocio(this.negocio!.id_negocio, nuevaSumaPuntajes, this.cantidadComentarios);
        });

      // Reinciar campos del formulario
      this.comentarioFormGroup.get('comentario')?.reset();
      this.comentarioFormGroup.get('puntaje')?.reset();
      this.estrellas = [true, false, false, false, false];
    }
  }

  prepararFormulario() {
    // Comentario
    this.comentarioFormGroup = this.formBuilder.group({
      comentario: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(150),
      ]),
      puntaje: new FormControl({
        value: 1,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern('[1-5]'),
      ]),
    });
  }

  estrellas = [true, false, false, false, false];
  marcarPuntaje(indiceSeleccionado: number) {
    this.estrellas = Array(5).fill(false).map( (value, index) => {
      return index <= indiceSeleccionado;
    });
    if (this.comentarioFormGroup) {
      this.comentarioFormGroup.get('puntaje')?.setValue(indiceSeleccionado + 1);
    }
  }

}
