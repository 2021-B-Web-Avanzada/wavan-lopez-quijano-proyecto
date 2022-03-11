import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {initSupabase} from "../../../supabase/init.supabase";
import {ProductoModelo} from "../../../modelos/producto.modelo";

@Injectable({
  providedIn: 'root'
})
export class ProductoAPIService {

  supabaseClient: SupabaseClient = createClient(
    initSupabase.url as string,
    initSupabase.key as string
  )

  TABLA_PRODUCTO = 'Producto';

  constructor() { }

  // Create
  async createProducto(producto: ProductoModelo){
    const { data, error } = await this.supabaseClient
      .from<ProductoModelo>(this.TABLA_PRODUCTO)
      .insert(producto)
    return { data, error };
  }

  // Read All
  async readProductos(id_negocio: number) {
    const { data, error } = await this.supabaseClient
      .from<ProductoModelo>(this.TABLA_PRODUCTO)
      .select()
      .eq('id_negocio', id_negocio)
    return { data, error };
  }

  // Read By ID
  async readProductoPorID(id_negocio: number, id_producto: number) {
    const { data, error } = await this.supabaseClient
      .from<ProductoModelo>(this.TABLA_PRODUCTO)
      .select()
      .eq('id_negocio', id_negocio)
      .eq('id_producto', id_producto)
      .single()
    return { data, error };
  }

  // Update
  async updateProducto(producto: ProductoModelo) {
    const { data, error } = await  this.supabaseClient
      .from<ProductoModelo>(this.TABLA_PRODUCTO)
      .update(producto)
      .eq('id_producto', producto.id_producto)
    return { data, error }
  }

  // Delete
  async deleteProductoPorID(id_producto: number){
    const { data, error } = await this.supabaseClient
      .from<ProductoModelo>(this.TABLA_PRODUCTO)
      .delete()
      .eq('id_producto', id_producto)
    return { data, error }
  }

}
