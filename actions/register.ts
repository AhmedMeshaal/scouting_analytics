"use server"

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import {bgCyan} from "next/dist/lib/picocolors";
import {getUserByEmail} from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

     if (!validateFields.success) {
         return { error: "Invalid fields!" };
     }

     const { email, password, name } = validateFields.data;
     const hashedPassword = await bcrypt.hash(password, 10);

     const existingUser = await getUserByEmail(email);

      if (existingUser) {
          return { error: "Email Already in use!" };
      }

      await db.user.create({
          data: {
              name,
              email,
              password: hashedPassword
          },
      });

     return { success: "User has been created!" };
};