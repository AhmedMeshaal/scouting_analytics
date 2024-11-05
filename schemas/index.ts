import * as z from "zod";
import {UserRole} from "@prisma/client";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "MINIMUM 6 CHARACTERS REQUIRED"
    }),
});

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
    }),
    code: z.optional(z.string()),
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

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "New Password is required!",
        path: ["newPassword"]
    })
.refine((data) => {
    if (data.newPassword && !data.password) {
        return false;
    }

    return true;
}, {
    message: "password is required",
    path: ["password"]
})