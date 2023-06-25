import fastify, { FastifyRequest } from "fastify";

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

const server = fastify({
	logger: loggerConfig["development"]
});

server.get("/health", (req: FastifyRequest, reply) => {
	req.log.warn("THIS IS WARNING");
	return {
		message: "Health OK",
	}
});


server.listen({ port: 8855 }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`Server listening at ${address}`)
});
