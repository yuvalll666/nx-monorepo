import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^[\x20-\x7E]+$/,
            "Password must contain only English characters and symbols"
        ),
});

export type LoginDto = z.infer<typeof loginSchema>;
