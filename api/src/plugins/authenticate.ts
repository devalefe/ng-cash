import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
  await request
    .jwtVerify()
    .catch((err) => {
      return response.status(401).send({
        message: "Token inválido."
      })
    });
}
