import { Component, OnInit } from '@angular/core';
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {AuthService} from "../../servicios/autenticacion/autenticacion.service";
import Swal from "sweetalert2";

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
    const nuevoEstado = negocio.estado == this.ESTADO_ACTIVO ? this.ESTADO_INACTIVO : this.ESTADO_ACTIVO;
    Swal.fire({
      title: '¿Está seguro de querer cambiar el estado a '+ nuevoEstado +'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.negocioAPIService.updateEstadoNegocio(negocio.id_negocio, nuevoEstado)
          .then(resultadoActualizacion => {
            negocio.estado = nuevoEstado;
            Swal.fire(
              'Actualizado!',
              'Cambiado a ' + nuevoEstado,
              'success'
            )
          });
      }
    })
  }

  eliminarNegocio(id_negocio: number) {
    Swal.fire({
      title: '¿Está seguro de querer eliminar el negocio?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.negocioAPIService.deleteNegocioPorID(id_negocio)
          .then(resultadoActualizacion => {
            Swal.fire(
              'Negocio eliminado',
              '',
              'success'
            )
            // Consulta los cambios en los negocios
            return this.negocioAPIService.readNegociosPorIDUsuario(this.authService.id_usuario);
          })
          .then(queryNegocios => {
            this.negocios = queryNegocios.data as NegocioModelo[];
          });
      }
    });
  }

}
