import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {ProductoAPIService} from "../../servicios/api/producto/producto-api.service";
import {ProductoModelo} from "../../modelos/producto.modelo";
import {ComentarioAPIService} from "../../servicios/api/comentario/comentario-api.service";
import {ComentarioModelo} from "../../modelos/comentario.modelo";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
    private readonly formBuilder: FormBuilder,
  ) { }

  // Información de la BD
  negocio?: NegocioModelo;
  productos?: ProductoModelo[];
  comentarios?: ComentarioModelo[];

  puntajePromedio?: number;
  cantidadComentarios?: number;

  // Escribir comentario
  comentarioFormGroup?: FormGroup;

  ngOnInit(): void {
    // Parámetros de consulta
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id_negocio = params['id_negocio'];
        // Consulta a la BD
        this.negocioAPIService.readNegocioPorID(id_negocio)
          .then(queryNegocio => {
            // Obtener datos del negocio
            this.negocio = queryNegocio.data as NegocioModelo;
            // Calcular estrellas
            this.puntajePromedio = this.calcularPuntajePromedio();
            // Consultar productos
            return this.productoAPIService.getProductos(this.negocio.id_negocio);
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
    })
  }

  calcularPuntajePromedio(): number {
    const suma_puntajes = this.negocio?.suma_puntajes;
    const cantidad_comentarios = this.negocio?.cantidad_comentarios;
    return Math.round((suma_puntajes as number) / (cantidad_comentarios as number));
  }

  enviarComentario() {

  }

  marcarPuntaje(puntaje: number) {
    if (this.comentarioFormGroup) {
      this.comentarioFormGroup.get('puntaje')?.setValue(puntaje);
    }
  }

  prepararFormulario() {
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
        value: 3,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern('[1-5]'),
      ]),
    });
  }

}
