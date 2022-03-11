import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {ProductoModelo} from "../../modelos/producto.modelo";
import {ProductoAPIService} from "../../servicios/api/producto/producto-api.service";

@Component({
  selector: 'app-ruta-editar-negocio-propio',
  templateUrl: './ruta-editar-negocio-propio.component.html',
  styleUrls: ['./ruta-editar-negocio-propio.component.scss']
})
export class RutaEditarNegocioPropioComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly negocioAPIService: NegocioAPIService,
    private readonly productoAPIService: ProductoAPIService,
  ) { }

  negocio?: NegocioModelo;
  productos?: ProductoModelo[];

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe((params) => {
      const id_negocio = params['id_negocio'];
      // Consultar negocio
      this.negocioAPIService.readNegocioPorID(id_negocio)
        .then(queryNegocio => {
          this.negocio = queryNegocio.data as NegocioModelo;
          // Consultar productos
          return this.productoAPIService.readProductos(this.negocio.id_negocio);
        })
        .then(queryProductos => {
          this.productos = queryProductos.data as ProductoModelo[];
          // Preparar
        });
    })
  }


  borrarFilaProducto(indiceABorrar: number) {
    // Eliminar fila de la tabla
    // delete this.productos![indiceABorrar];
    // Actualizar lista de productos
    console.log('Antes', this.productos)
    this.productos?.splice(indiceABorrar, 1);
    console.log('Despues', this.productos)
  }


}
