import {Component, Input, OnInit} from '@angular/core';
import {ComentarioModelo} from "../../modelos/comentario.modelo";
import {UsuarioModelo} from "../../modelos/usuario.modelo";
import {UsuarioAPIService} from "../../servicios/api/usuario/usuario-api.service";

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {

  constructor(
    private readonly usuarioAPIService: UsuarioAPIService,
  ) { }

  @Input() comentario?: ComentarioModelo;
  usuario?: UsuarioModelo;

  ngOnInit(): void {
    // Obtener datos del usuario que hizo el comentario
    this.usuarioAPIService.readUsuarioPorID(this.comentario!.id_usuario)
      .then(queryUsuario => {
        this.usuario = queryUsuario.data as UsuarioModelo;
      })
  }

}
