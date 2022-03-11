import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {initSupabase} from "../../../supabase/init.supabase";
import {ProvinciaModelo} from "../../../modelos/provincia.modelo";

@Injectable({
  providedIn: 'root'
})
export class ProvinciaAPIService {

  supabaseClient: SupabaseClient = createClient(
    initSupabase.url as string,
    initSupabase.key as string
  )

  TABLA_PROVINCIA = 'Provincia';

  constructor() { }

  // Create
  async createProvincia(provincia: ProvinciaModelo){
    const { data, error } = await this.supabaseClient
      .from<ProvinciaModelo>(this.TABLA_PROVINCIA)
      .insert(provincia)
    return { data, error };
  }

  // Read All
  async getProvincias() {
    const { data, error } = await this.supabaseClient
      .from<ProvinciaModelo>(this.TABLA_PROVINCIA)
      .select()
    return { data, error };
  }

  // Read By ID
  async getProvinciaPorID(id_provincia: number) {
    const { data, error } = await this.supabaseClient
      .from<ProvinciaModelo>(this.TABLA_PROVINCIA)
      .select()
      .eq('id_provincia', id_provincia)
      .single()
    return { data, error };
  }
}
