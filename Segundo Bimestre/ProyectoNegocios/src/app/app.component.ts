import {Component, OnInit} from '@angular/core';
import {AuthService} from "./servicios/autenticacion/autenticacion.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProyectoNegocios';

  constructor(
    private readonly authService: AuthService,
  ) {}

  // TODO: con una variable Output en el Login se puede cambiar
  // TODO: este valor para mostrar o no el menu del usuario (esquina superior derecha)
  mostrarMenuUsuario = false;

  ngOnInit(): void {

  }



}
