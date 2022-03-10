import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {initSupabase} from "../../supabase/init.supabase";
import {NegocioModelo} from "../../modelos/negocio.modelo";

@Injectable({
  providedIn: 'root'
})
export class NegocioAPIService {

  supabaseClient: SupabaseClient = createClient(
    initSupabase.url as string,
    initSupabase.key as string
  )

  constructor() { }

  // Create


  // Read
  async getNegocios() {
    const { data, error } = await this.supabaseClient
      .from<NegocioModelo>('Negocio')
      .select()
    return { data, error };
  }

  async getNegocioPorID(id_negocio: number) {
    const { data, error } = await this.supabaseClient
      .from<NegocioModelo>('Negocio')
      .select()
      .eq('id_negocio', id_negocio)
    return { data, error };
  }

}
