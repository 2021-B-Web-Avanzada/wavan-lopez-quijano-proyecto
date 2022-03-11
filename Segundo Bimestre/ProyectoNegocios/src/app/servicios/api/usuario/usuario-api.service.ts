import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {initSupabase} from "../../../supabase/init.supabase";
import {UsuarioModelo} from "../../../modelos/usuario.modelo";

@Injectable({
  providedIn: 'root'
})
export class UsuarioAPIService {

  supabaseClient: SupabaseClient = createClient(
    initSupabase.url as string,
    initSupabase.key as string
  )

  TABLA_USUARIO = 'Usuario';

  constructor() { }

  // TODO: En los métodos CRUD que necesiten clave foránea pon primero la Foreign Key y luego la Primary Key de ser necesario
  // TODO: (Para tener un estándar xd)

  // Create
  async createUsuario(usuario: UsuarioModelo){
    const { data, error } = await this.supabaseClient
      .from<UsuarioModelo>(this.TABLA_USUARIO)
      .insert(usuario)
    return { data, error };
  }

  // Read All
  async readUsuario() {
    const { data, error } = await this.supabaseClient
      .from<UsuarioModelo>(this.TABLA_USUARIO)
      .select()
    return { data, error };
  }

  //Read By ID
  async readUsuarioPorID(id_usuario: number) {
    const { data, error } = await this.supabaseClient
      .from<UsuarioModelo>(this.TABLA_USUARIO)
      .select()
      .eq('id_usuario', id_usuario)
      .single()
    return { data, error };
  }

  // Update
  async updateUsuario(usuario: UsuarioModelo) {
    const { data, error } = await this.supabaseClient
      .from<UsuarioModelo>(this.TABLA_USUARIO)
      .update(usuario)
      .eq('id_usuario',usuario.id_usuario)
    return { data, error };
  }

}
