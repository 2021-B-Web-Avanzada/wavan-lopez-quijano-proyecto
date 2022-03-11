export interface ComentarioModelo{
  id_comentario?: number;
  id_usuario: number;
  id_negocio: number;
  titulo: string;
  mensaje: string;
  fecha: string;
  puntaje: number;
}
