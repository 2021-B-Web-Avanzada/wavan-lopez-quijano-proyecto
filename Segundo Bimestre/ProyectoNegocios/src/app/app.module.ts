import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaMapaComponent } from './rutas/ruta-mapa/ruta-mapa.component';
import { RutaNegocioComponent } from './rutas/ruta-negocio/ruta-negocio.component';
import { NegocioComponent } from './componentes/negocio/negocio.component';
import { RutaNegociosPropiosComponent } from './rutas/ruta-negocios-propios/ruta-negocios-propios.component';
import { RutaEditarNegocioPropioComponent } from './rutas/ruta-editar-negocio-propio/ruta-editar-negocio-propio.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { SocialMediaComponent } from './componentes/social-media/social-media.component';
import { EstrellasComponent } from './componentes/estrellas/estrellas.component';
import { ComentarioComponent } from './componentes/comentario/comentario.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RutaRegistrarseComponent } from './rutas/ruta-registrarse/ruta-registrarse.component';
import { RutaAprobarNegociosComponent } from './rutas/ruta-aprobar-negocios/ruta-aprobar-negocios.component';
import { RutaPerfilUsuarioComponent } from './rutas/ruta-perfil-usuario/ruta-perfil-usuario.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import {EsUsuarioGuard} from "./servicios/autenticacion/usuario.guard";
import {EsAdministradorGuard} from "./servicios/autenticacion/admin.guard";


@NgModule({
  declarations: [
    AppComponent,
    RutaMapaComponent,
    RutaNegocioComponent,
    NegocioComponent,
    RutaNegociosPropiosComponent,
    RutaEditarNegocioPropioComponent,
    SocialMediaComponent,
    EstrellasComponent,
    ComentarioComponent,
    RutaLoginComponent,
    RutaRegistrarseComponent,
    RutaAprobarNegociosComponent,
    RutaPerfilUsuarioComponent,
    ProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    EsAdministradorGuard,
    EsUsuarioGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
