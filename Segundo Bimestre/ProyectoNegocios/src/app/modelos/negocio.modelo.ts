export interface NegocioModelo {
  id_negocio: number;
  id_categoria: number;
  id_usuario?: number;
  id_provincia: number;
  nombre: string;
  descripcion: string;
  suma_puntajes?: number;
  cantidad_comentarios?: number;
  latitud: number;
  longitud: number;
  fotografia?: string;
  enlace_facebook: string;
  enlace_instagram: string;
  enlace_sitio_web: string;
  telefono_fijo: number;
  telefono_movil: number;
  estado?: string;
}
