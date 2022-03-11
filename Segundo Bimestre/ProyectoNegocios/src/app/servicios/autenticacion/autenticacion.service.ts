import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  inicioSesion = false;
  rol = '';
  id_usuario :number = 0;

  esAdministrador() {
    return this.inicioSesion && this.rol == 'administrador';
  }

  esUsuario() {
    return this.inicioSesion && this.rol == 'usuario';
  }
}
