import { z } from "zod";

export const createUserSchema = z
    .object({
        email: z.email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^[\x20-\x7E]+$/,
                "Password must contain only English characters and symbols"
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type CreateUserDto = z.infer<typeof createUserSchema>;
