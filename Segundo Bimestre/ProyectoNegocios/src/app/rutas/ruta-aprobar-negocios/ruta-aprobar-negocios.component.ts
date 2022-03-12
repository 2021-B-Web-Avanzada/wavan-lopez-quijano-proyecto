import { Component, OnInit } from '@angular/core';
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {AuthService} from "../../servicios/autenticacion/autenticacion.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Desea activar el negocio '+ negocio.nombre +'?',
      text: "Confirmar acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.negocioAPIService.updateEstadoNegocio(negocio.id_negocio, this.ESTADO_ACTIVO)
          .then(resultadoActualizacion => {
            Swal.fire(
              'Activado',
              '',
              'success'
            )
            this.actualizarNegociosPendientes();
          })
      }
    });
  }

  rechazarNegocio(negocio: NegocioModelo) {
    Swal.fire({
      title: '¿Está seguro de querer rechazar el negocio '+ negocio.nombre +'?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Rechazar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.negocioAPIService.deleteNegocioPorID(negocio.id_negocio)
          .then(resultadoEliminacion => {
            Swal.fire(
              'Rechazado!',
              '',
              'success'
            )
            this.actualizarNegociosPendientes();
          })
      }
    })

  }

}
