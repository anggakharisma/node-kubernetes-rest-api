import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

export const getTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
}

export const getTodo = async (req: FastifyRequest<{
  Params: {
    id: number;
  }
}>, reply: FastifyReply) => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: +req.params.id
    }
  });

  if (todo === null) reply.send({ message: "Todo not found" }).status(404);

  reply.send(todo);
}

type TodoCreateRequest = FastifyRequest<{
  Body: {
    name: string,
  }
}>

export const createTodo = async (req: TodoCreateRequest, reply: FastifyReply) => {
  try {
    await prisma.todo.create({
      data: {
        name: req.body.name,
      }
    });
    reply.send({ message: "todo created" });
  } catch (e: any) {
    reply.send({ error: e.message });
  }

}

export const updateTodo = async (req: FastifyRequest<{
  Params: {
    id: number;
  },
  Body: {
    name: string;
    is_done?: boolean
  }
}>, reply: FastifyReply) => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: +req.params.id
    },
  });

  await prisma.todo.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name || todo?.name,
      isDone: req.body.is_done || todo?.isDone,

    }
  });

  reply.send({
    message: "todo updated"
  });
}

export const deleteTodo = async (req: FastifyRequest, reply: FastifyReply) => {

}
