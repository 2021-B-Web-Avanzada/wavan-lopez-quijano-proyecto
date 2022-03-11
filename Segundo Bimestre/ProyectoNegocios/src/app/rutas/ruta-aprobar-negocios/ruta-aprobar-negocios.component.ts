import { Component, OnInit } from '@angular/core';
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {AuthService} from "../../servicios/autenticacion/autenticacion.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";

@Component({
  selector: 'app-ruta-aprobar-negocios',
  templateUrl: './ruta-aprobar-negocios.component.html',
  styleUrls: ['./ruta-aprobar-negocios.component.scss']
})
export class RutaAprobarNegociosComponent implements OnInit {

  constructor(
    private readonly negocioAPIService: NegocioAPIService,
    private readonly authService: AuthService,
  ) { }

  negociosPendientes?: NegocioModelo[];
  ESTADO_PENDIENTE = 'Pendiente';
  ESTADO_ACTIVO = 'Activo';

  ngOnInit(): void {
    // Consultar negocios
    this.actualizarNegociosPendientes();
  }

  actualizarNegociosPendientes() {
    this.negocioAPIService.readNegociosPorEstado(this.ESTADO_PENDIENTE)
      .then(queryNegocios => {
        this.negociosPendientes = queryNegocios.data as NegocioModelo[];
      });
  }

  aprobarNegocio(negocio: NegocioModelo) {
    this.negocioAPIService.updateEstadoNegocio(negocio.id_negocio, this.ESTADO_ACTIVO)
      .then(resultadoActualizacion => {
        // TODO: Alerta => se ha activado/actualizado el negocio
        this.actualizarNegociosPendientes();
      })
  }

  rechazarNegocio(negocio: NegocioModelo) {
    // TODO: Alerta => Esta seguro?
    this.negocioAPIService.deleteNegocioPorID(negocio.id_negocio)
      .then(resultadoEliminacion => {
        this.actualizarNegociosPendientes();
      })
  }

}
