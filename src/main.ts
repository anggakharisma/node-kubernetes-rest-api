import fastify, { FastifyReply, FastifyRequest } from "fastify";

import { createTodo, getTodo, getTodos, updateTodo } from "./controllers/todos";
import { PrismaClient } from "@prisma/client";

const loggerConfig = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
}

const prisma = new PrismaClient();
const app = fastify({
    logger: loggerConfig["development"]
});

async function main() {
    app.get("/health", (req: FastifyRequest, reply: FastifyReply) => {
        reply.send({
            message: "Health OK",
        });
    });

    app.get("/todos", getTodos);
    app.get("/todos/:id", getTodo);
    app.post("/todos/", createTodo);
    app.put("/todos/:id", updateTodo);
    app.delete("/todos/:id", () => { });

    app.listen({ host: "0.0.0.0", port: 8855 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log(`Server listening at ${address}`)
    });
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
