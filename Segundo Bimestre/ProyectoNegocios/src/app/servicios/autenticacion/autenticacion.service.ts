import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  inicioSesion = false;
  rol = '';
  id_usuario :number = 0;

  esAdministrador() {
    return this.inicioSesion && this.rol === 'Administrador';
  }

  esUsuario() {
    return this.inicioSesion && this.rol === 'Usuario';
  }

  cerrarSesion() {
    this.inicioSesion = false;
    this.rol = '';
    this.id_usuario = 0;
  }
}
