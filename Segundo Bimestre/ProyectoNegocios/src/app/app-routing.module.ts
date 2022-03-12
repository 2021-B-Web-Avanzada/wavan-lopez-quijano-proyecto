import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaMapaComponent} from "./rutas/ruta-mapa/ruta-mapa.component";
import {RutaNegocioComponent} from "./rutas/ruta-negocio/ruta-negocio.component";
import {RutaNegociosPropiosComponent} from "./rutas/ruta-negocios-propios/ruta-negocios-propios.component";
import {RutaEditarNegocioPropioComponent} from "./rutas/ruta-editar-negocio-propio/ruta-editar-negocio-propio.component";
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";
import {RutaRegistrarseComponent} from "./rutas/ruta-registrarse/ruta-registrarse.component";
import {RutaAprobarNegociosComponent} from "./rutas/ruta-aprobar-negocios/ruta-aprobar-negocios.component";
import {RutaPerfilUsuarioComponent} from "./rutas/ruta-perfil-usuario/ruta-perfil-usuario.component";
import {EsUsuarioGuard} from "./servicios/autenticacion/usuario.guard";
import {EsAdministradorGuard} from "./servicios/autenticacion/admin.guard";

const routes: Routes = [
  // Usuario
  {
    path: 'mapa',
    component: RutaMapaComponent,
    canActivate: [EsUsuarioGuard]
  },
  {
    path: 'negocio/:id_negocio',
    component: RutaNegocioComponent,
    canActivate: [EsUsuarioGuard]
  },
  {
    path: 'misNegocios',
    component: RutaNegociosPropiosComponent,
    canActivate: [EsUsuarioGuard]
  },
  {
    path: 'misNegocios/:id_negocio',
    component: RutaEditarNegocioPropioComponent,
    canActivate: [EsUsuarioGuard]
  },
  {
    path: 'perfil_usuario/:id_usuario',
    component: RutaPerfilUsuarioComponent,
    canActivate: [EsUsuarioGuard]
  },
  // Todos acceden a estas pantallas
  {
    path: 'login',
    component: RutaLoginComponent,
  },
  {
    path: 'registrarse',
    component: RutaRegistrarseComponent
  },
  {
    path: 'negociosPendientes',
    component: RutaAprobarNegociosComponent,
    canActivate: [EsAdministradorGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
