import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "EMAIL IS REQUIRED"
    }),
    password: z.string().min(1, {
        message: "PASSWORD IS REQUIRED"
    })
});