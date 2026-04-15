import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./env";
import { waitUntil } from "@vercel/functions";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders:{
        google:{
            clientId: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!,
        }
    },
    user:{
        additionalFields:{
            role: {
                type:['admin', 'vendor', 'user'],
                defaultValue:'user',
                required:true,
                input:true
            }
        }
    },
    emailAndPassword:{
        enabled:true,
        requireEmailVerification:true,
        sendResetPassword: async ({user, url, token}, request) => {
            waitUntil()
        }
    }
});