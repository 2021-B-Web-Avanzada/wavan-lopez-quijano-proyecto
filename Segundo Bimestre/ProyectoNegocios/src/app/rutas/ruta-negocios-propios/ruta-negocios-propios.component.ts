import { Component, OnInit } from '@angular/core';
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";

@Component({
  selector: 'app-ruta-negocios-propios',
  templateUrl: './ruta-negocios-propios.component.html',
  styleUrls: ['./ruta-negocios-propios.component.scss']
})
export class RutaNegociosPropiosComponent implements OnInit {

  constructor(
    private readonly negocioAPIService: NegocioAPIService,
  ) { }

  negocios?: NegocioModelo[];

  ngOnInit(): void {
    // Consultar negocios
    // TODO: Usar id del usuario logeado dentro del read...()
    this.negocioAPIService.readNegociosPorIDUsuario(1)
      .then(queryNegocios => {
        this.negocios = queryNegocios.data as NegocioModelo[];
      })
  }

}
