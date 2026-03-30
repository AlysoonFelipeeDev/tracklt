import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export const signupSchema = loginSchema.extend({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    image: z.string().url("URL inválida"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;