import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaMapaComponent} from "./rutas/ruta-mapa/ruta-mapa.component";
import {RutaNegocioComponent} from "./rutas/ruta-negocio/ruta-negocio.component";
import {RutaNegociosPropiosComponent} from "./rutas/ruta-negocios-propios/ruta-negocios-propios.component";
import {RutaEditarNegocioPropioComponent} from "./rutas/ruta-editar-negocio-propio/ruta-editar-negocio-propio.component";

const routes: Routes = [
  {
    path: 'mapa',
    component: RutaMapaComponent,
  },
  {
    path: 'negocio/:negocioID',
    component: RutaNegocioComponent,
  },
  {
    path: 'misNegocios',
    component: RutaNegociosPropiosComponent,
  },
  {
    path: 'misNegocios/:negocioID',
    component: RutaEditarNegocioPropioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
