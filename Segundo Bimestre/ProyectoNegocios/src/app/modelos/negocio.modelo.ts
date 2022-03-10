export interface NegocioModelo {
  id_negocio: number;
  id_categoria: number;
  id_usuario: number;
  nombre: string;
  descripcion: string;
  suma_puntajes: number;
  latitud: number;
  longitud: number;
  provincia: string;
  fotografia: string;
  enlace_facebook: string;
  enlace_instagram: string;
  enlace_sitio_web: string;
  telefono_fijo: number;
  telefono_movil: number;
  estado: string;
}
