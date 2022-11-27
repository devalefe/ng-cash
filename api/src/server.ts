import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { userRoutes } from "./routes/user";
import { transactionsRoutes } from "./routes/transactions";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(userRoutes);
  await fastify.register(transactionsRoutes);

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET_KEY!
  });

  await fastify.listen({ port: 3000, host: "0.0.0.0" });
}

bootstrap();
