import {Component, OnInit} from '@angular/core';
import {AuthService} from "./servicios/autenticacion/autenticacion.service";
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";

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

  // TODO: poner que se haga visble=false y borrar la imagen cuando se deslogea
  infoMenuUsuario = {
    visible: false,
    imagenPerfil: '',
  };

  ngOnInit(): void {

  }

  // TODO: Que mismo con esto?
  onActivate(component: any) {
    // if (component instanceof RutaLoginComponent)
      // this.infoMenuUsuario = component.habilitarMenuUsuario()

  }

  onDeactivate() {

  }
}
