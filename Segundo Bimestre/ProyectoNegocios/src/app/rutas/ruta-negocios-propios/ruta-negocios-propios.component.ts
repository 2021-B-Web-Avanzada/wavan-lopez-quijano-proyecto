import { Component, OnInit } from '@angular/core';
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {AuthService} from "../../servicios/autenticacion/autenticacion.service";

@Component({
  selector: 'app-ruta-negocios-propios',
  templateUrl: './ruta-negocios-propios.component.html',
  styleUrls: ['./ruta-negocios-propios.component.scss']
})
export class RutaNegociosPropiosComponent implements OnInit {

  constructor(
    private readonly negocioAPIService: NegocioAPIService,
    private readonly authService: AuthService,
  ) { }

  negocios?: NegocioModelo[];
  ESTADO_ACTIVO = 'Activo';
  ESTADO_INACTIVO = 'Inactivo';
  ESTADO_PENDIENTE = 'Pendiente';


  ngOnInit(): void {
    // Consultar negocios
    const id_usuario = this.authService.id_usuario;
    this.negocioAPIService.readNegociosPorIDUsuario(id_usuario)
      .then(queryNegocios => {
        this.negocios = queryNegocios.data as NegocioModelo[];
      })
  }

  cambiarEstadoNegocio(negocio: NegocioModelo) {
    // TODO: Alerta => Quiere activar/inactivar el negocio 'NOMBRE' ??/
    const nuevoEstado = negocio.estado == this.ESTADO_ACTIVO ? this.ESTADO_INACTIVO : this.ESTADO_ACTIVO;
    this.negocioAPIService.updateEstadoNegocio(negocio.id_negocio, nuevoEstado)
      .then(resultadoActualizacion => {
        console.error(resultadoActualizacion.error);
      });
    negocio.estado = nuevoEstado;
  }

  eliminarNegocio(id_negocio: number) {
    // TODO: Alerta => Está seguro de querer eliminar?
    this.negocioAPIService.deleteNegocioPorID(id_negocio)
      .then(resultadoActualizacion => {
        // TODO: Se ha eliminado exitosamente

        // Consulta los cambios en los negocios
        return this.negocioAPIService.readNegocios();
      })
      .then(queryNegocios => {
        this.negocios = queryNegocios.data as NegocioModelo[];
      });
  }

}
