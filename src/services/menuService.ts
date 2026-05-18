import { supabase } from './supabase'
import type { MenuItem, MenuCategoria } from '../types'

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('categoria')
      .order('nombre')
    if (error) throw error
    return data ?? []
  },

  async getByCategoria(categoria: MenuCategoria): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('categoria', categoria)
      .order('nombre')
    if (error) throw error
    return data ?? []
  },

  async toggleDisponible(id: string, disponible: boolean): Promise<void> {
    const { error } = await supabase
      .from('menu_items')
      .update({ disponible, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  },

  async upsert(item: Partial<MenuItem>): Promise<MenuItem> {
    const { data, error } = await supabase
      .from('menu_items')
      .upsert({ ...item, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async eliminar(id: string): Promise<void> {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}
