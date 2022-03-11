import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {initSupabase} from "../../../supabase/init.supabase";
import {NegocioModelo} from "../../../modelos/negocio.modelo";

@Injectable({
  providedIn: 'root'
})
export class NegocioAPIService {

  supabaseClient: SupabaseClient = createClient(
    initSupabase.url as string,
    initSupabase.key as string
  )

  TABLA_NEGOCIO = 'Negocio';

  constructor() { }

  // Create
  async createNegocio(negocio: NegocioModelo){
    const { data, error } = await this.supabaseClient
      .from<NegocioModelo>(this.TABLA_NEGOCIO)
      .insert(negocio)
    return { data, error };
  }

  // Read All
  async readNegocio() {
    const { data, error } = await this.supabaseClient
      .from<NegocioModelo>(this.TABLA_NEGOCIO)
      .select()
    return { data, error };
  }

  // Read Por ID
  async readNegocioPorID(id_negocio: number) {
    const { data, error } = await this.supabaseClient
      .from<NegocioModelo>(this.TABLA_NEGOCIO)
      .select()
      .eq('id_negocio', id_negocio)
      .single()
    return { data, error };
  }

  // Update All
  async updateNegocio(negocio: NegocioModelo) {
    const {data, error} = await this.supabaseClient
      .from<NegocioModelo>(this.TABLA_NEGOCIO)
      .update(negocio)
      .eq('id_negocio', negocio.id_negocio)
    return {data, error}
  }

  // Update Estado
  async updateEstadoNegocio(id_negocio: number, estadoCambiado: string){
    const { data, error } = await this.supabaseClient
      .from<NegocioModelo>(this.TABLA_NEGOCIO)
      .update({estado: estadoCambiado})
      .eq('id_negocio', id_negocio)
    return { data, error };
  }

  // Delete
  async deleteNegocioPorID(id_negocio: number){
    const { data, error } = await this.supabaseClient
      .from<NegocioModelo>(this.TABLA_NEGOCIO)
      .delete()
      .eq('id_negocio', id_negocio)
    return { data, error }
  }
}
