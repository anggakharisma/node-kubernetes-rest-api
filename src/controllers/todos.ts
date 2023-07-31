import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type TodoCreateRequest = FastifyRequest<{
  Body: {
    name: string,
  }
}>

interface TodoParams {
  id: number
}

export const getTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
}

export const getTodo = async (req: FastifyRequest<{ Params: TodoParams }>, reply: FastifyReply) => {
  const todo = await prisma.todo.findFirst({
    where: {
      id: +req.params.id
    }
  });

  if (todo === null) reply.send({ message: "Todo not found" }).status(404);

  reply.send(todo);
}


export const createTodo = async (req: TodoCreateRequest, reply: FastifyReply) => {
  if (!req.body) reply.send({ error: "Body shouldn't be empty" });

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
  Params: TodoParams,
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
