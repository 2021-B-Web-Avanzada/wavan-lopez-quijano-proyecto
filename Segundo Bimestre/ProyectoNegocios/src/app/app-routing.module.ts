import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaMapaComponent} from "./rutas/ruta-mapa/ruta-mapa.component";
import {RutaNegocioComponent} from "./rutas/ruta-negocio/ruta-negocio.component";
import {RutaNegociosPropiosComponent} from "./rutas/ruta-negocios-propios/ruta-negocios-propios.component";
import {RutaEditarNegocioPropioComponent} from "./rutas/ruta-editar-negocio-propio/ruta-editar-negocio-propio.component";
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";
import {RutaRegistrarseComponent} from "./rutas/ruta-registrarse/ruta-registrarse.component";
import {RutaAprobarNegociosComponent} from "./rutas/ruta-aprobar-negocios/ruta-aprobar-negocios.component";

const routes: Routes = [
  // Usuario
  {
    path: '',
    redirectTo: '/mapa',
    pathMatch: 'full',
  },
  {
    path: 'mapa',
    component: RutaMapaComponent,
  },
  {
    path: 'negocio/:id_negocio',
    component: RutaNegocioComponent,
  },
  {
    path: 'misNegocios',
    component: RutaNegociosPropiosComponent,
  },
  {
    path: 'misNegocios/:id_negocio',
    component: RutaEditarNegocioPropioComponent,
  },
  {
    path: 'login',
    component: RutaLoginComponent,
  },
  {
    path: 'registrarse',
    component: RutaRegistrarseComponent
  },
  // TODO: Administrador
  {
    path: 'negociosPendientes',
    component: RutaAprobarNegociosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
