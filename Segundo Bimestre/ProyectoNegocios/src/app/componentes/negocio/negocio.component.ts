import {Component, Input, OnInit} from '@angular/core';
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {ProvinciaModelo} from "../../modelos/provincia.modelo";
import {ProvinciaAPIService} from "../../servicios/api/provincia/provincia-api.service";

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss']
})
export class NegocioComponent implements OnInit {

  constructor(
    private readonly provinciaAPIService: ProvinciaAPIService,
  ) { }

  @Input() negocio?: NegocioModelo;
  provincia?: ProvinciaModelo;

  ngOnInit(): void {
    // Consultar provincia
    this.provinciaAPIService.readProvinciaPorID(this.negocio!.id_provincia)
      .then(queryProvincia => {
        this.provincia = queryProvincia.data as ProvinciaModelo;
      })
  }

}
