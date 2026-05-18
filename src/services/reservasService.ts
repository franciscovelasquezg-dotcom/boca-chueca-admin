import { supabase } from './supabase'
import type { Reserva, ReservaEstado } from '../types'

export const reservasService = {
  async getAll(): Promise<Reserva[]> {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true })
    if (error) throw error
    return data ?? []
  },

  async getHoy(): Promise<Reserva[]> {
    const hoy = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('fecha', hoy)
      .order('hora', { ascending: true })
    if (error) throw error
    return data ?? []
  },

  async getPendientes(): Promise<Reserva[]> {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('estado', 'pendiente')
      .order('fecha', { ascending: true })
    if (error) throw error
    return data ?? []
  },

  async updateEstado(id: string, estado: ReservaEstado): Promise<void> {
    const { error } = await supabase
      .from('reservas')
      .update({ estado })
      .eq('id', id)
    if (error) throw error
  },

  async crear(reserva: Omit<Reserva, 'id' | 'created_at' | 'estado'>): Promise<Reserva> {
    const { data, error } = await supabase
      .from('reservas')
      .insert({ ...reserva, estado: 'pendiente' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async eliminar(id: string): Promise<void> {
    const { error } = await supabase
      .from('reservas')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}
