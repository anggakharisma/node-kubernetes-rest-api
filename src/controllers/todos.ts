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
}>, rep: FastifyReply) => {
	const todo = await prisma.todo.findFirst({
		where: {
			id: req.params.id
		}
	});

	return todo;
}

type TodoCreateRequest = FastifyRequest<{
	Body: {
		name: string
	}
}>

export const createTodo = async (req: TodoCreateRequest, reply: FastifyReply) => {
	await prisma.todo.create({
		data: {
			name: req.body.name,
		}
	});

	reply.send({ message: "todo created" });
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
			id: req.params.id
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