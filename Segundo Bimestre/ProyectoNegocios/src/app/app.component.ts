import {Component, OnInit} from '@angular/core';
import {AuthService} from "./servicios/autenticacion/autenticacion.service";
import {RutaLoginComponent} from "./rutas/ruta-login/ruta-login.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProyectoNegocios';

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  infoMenuUsuario = {
    visible: false,
    imagenPerfil: '',
  };
  suscripcion?: Subscription;

  ngOnInit(): void {

  }

  onActivate(component: any) {
    if (component instanceof RutaLoginComponent) {
      this.suscripcion = component.infoMenuUsuario.subscribe({
        next: (data: {visible: boolean, imagenPerfil: string}) => {
          this.infoMenuUsuario.visible = data.visible;
          this.infoMenuUsuario.imagenPerfil = data.imagenPerfil;
        }
      })
    }
  }

  onDeactivate() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    Swal.fire(
      'Gracias por visitarnos!',
      '',
      'success'
    )
    this.router.navigate(['/login']);
  }
}
