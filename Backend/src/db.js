import { PrismaClient } from '@prisma/client'

/** @type { PrismaClient } */
let db

if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
    }
    db = global.__db;
}

export { db };

