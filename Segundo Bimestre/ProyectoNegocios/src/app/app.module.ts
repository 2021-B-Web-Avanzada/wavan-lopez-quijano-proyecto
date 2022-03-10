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
    ComentarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
