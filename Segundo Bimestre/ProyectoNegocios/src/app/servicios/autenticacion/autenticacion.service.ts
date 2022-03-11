import {Injectable} from "@angular/core";

@Injectable()
export class AuthService{

  inicioSesion = false;
  rolUsuario = '';

  esAdministrador() {
    return this.inicioSesion && this.rolUsuario == 'administrador';
  }

  esUsuario() {
    return this.inicioSesion && this.rolUsuario == 'usuario';
  }
}
