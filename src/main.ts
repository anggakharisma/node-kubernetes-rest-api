import fastify from "fastify";
const server = fastify({
	logger: true
});

server.get("/health", (req, reply) => {
  return {
    message: "Health OsK"
  }
});


server.listen({ port: 8855 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`)
});
