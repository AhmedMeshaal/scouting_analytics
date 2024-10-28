import * as z from "zod";

export const ResetSchema = z.object({
    email: z.string().email({
        message: "EMAIL IS REQUIRED"
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "EMAIL IS REQUIRED"
    }),
    password: z.string().min(1, {
        message: "PASSWORD IS REQUIRED"
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "EMAIL IS REQUIRED"
    }),
    password: z.string().min(6, {
        message: "MINIMUM 6 CHARACTERS REQUIRED"
    }),
    name: z.string().min(1,{
        message: "NAME IS REQUIRED"
    })
});