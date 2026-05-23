import { z } from "zod";

// Login admin
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

// Reserva
export const reservaSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  telefono: z.string().min(8, "Teléfono inválido").optional().or(z.literal("")),
  fecha: z.string().min(1, "Selecciona una fecha"),
  hora: z.string().min(1, "Selecciona una hora"),
  personas: z.number().int().min(1).max(20),
  notas: z.string().max(300).optional(),
});

// Ítem de menú
export const menuItemSchema = z.object({
  nombre: z.string().min(2).max(100),
  descripcion: z.string().max(300).optional(),
  precio: z.number().positive("Debe ser mayor a 0"),
  categoria: z.string().min(1, "Selecciona una categoría"),
  disponible: z.boolean().default(true),
});

// Receta
export const recetaSchema = z.object({
  nombre: z.string().min(2).max(100),
  ingredientes: z.string().min(5, "Describe los ingredientes"),
  preparacion: z.string().min(10, "Describe la preparación"),
  porciones: z.number().int().min(1).optional(),
  tiempoMinutos: z.number().int().min(1).optional(),
});

// Idea / inbox
export const ideaSchema = z.object({
  titulo: z.string().min(2).max(100),
  descripcion: z.string().min(5),
  categoria: z.string().optional(),
  prioridad: z.enum(["baja", "media", "alta"]).default("media"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ReservaFormData = z.infer<typeof reservaSchema>;
export type MenuItemFormData = z.infer<typeof menuItemSchema>;
export type RecetaFormData = z.infer<typeof recetaSchema>;
export type IdeaFormData = z.infer<typeof ideaSchema>;
