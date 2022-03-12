import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {initSupabase} from "../../../supabase/init.supabase";
import {ComentarioModelo} from "../../../modelos/comentario.modelo";
import {UsuarioModelo} from "../../../modelos/usuario.modelo";

@Injectable({
  providedIn: 'root'
})
export class ComentarioAPIService {

  supabaseClient: SupabaseClient = createClient(
    initSupabase.url as string,
    initSupabase.key as string
  )

  TABLA_COMENTARIO = 'Comentario';

  constructor() { }

  // Create
  async createComentario(comentario: ComentarioModelo){
    const { data, error } = await this.supabaseClient
      .from<ComentarioModelo>(this.TABLA_COMENTARIO)
      .insert(comentario)
    return { data, error };
  }

  // Read All
  async readComentarios(id_negocio: number) {
    const { data, error } = await this.supabaseClient
      .from<ComentarioModelo>(this.TABLA_COMENTARIO)
      .select()
      .eq('id_negocio', id_negocio)
    return { data, error };
  }

  // Read By Id
  async readComentarioPorID(id_negocio: number, id_comentario: number) {
    const { data, error } = await this.supabaseClient
      .from<ComentarioModelo>(this.TABLA_COMENTARIO)
      .select()
      .eq('id_negocio', id_negocio)
      .eq('id_comentario', id_comentario)
      .single()
    return { data, error };
  }

}
