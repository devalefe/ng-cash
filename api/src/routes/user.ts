import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

import { hash, compare } from "bcrypt";
import z from "zod";

import { authenticate } from "../plugins/authenticate";

interface BodyDataProps {
  username: string; 
  password: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/signup", async (request, response) => {
    const createUserBody = z.object({
      username: z
        .string()
        .min(3, "O nome de usuário precisa ter ao menos 3 letras.")
        .regex(new RegExp(".*[a-z].*"), "O usuário deve conter apenas letras minúsculas."),
      password: z
        .string()
        .min(8, "A senha precisar ter no mínimo 8 caracteres.")
        .regex(new RegExp(".*[A-Z].*"), "Pelo menos uma letra maiúscula é necessário.")
        .regex(new RegExp(".*[a-z].*"), "Pelo menos uma letra minúscula é necessário.")
        .regex(new RegExp(".*\\d.*"), "Pelo menos um número é necessário."),
    });

    const bodyData = request.body as BodyDataProps;
    
    const userAlreadyExists = await prisma.users.findUnique({
      where: { username: bodyData.username },
      include: { account: true }
    });
    
    if(userAlreadyExists) {
      return response.status(400).send({
        message: "Oops! Usuário já possui cadastro.",
      });
    }

    const { username, password } = createUserBody.parse(bodyData);

    const hashedPassword = await hash(password, 10);
    
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        account: {
          create: {
            balance: 100
          }
        }
      },
      include: {
        account: true
      }
    });

    const accessToken = fastify.jwt.sign(
      { 
        id: newUser.id,
        username: newUser.username
      },
      {
        sub: newUser.id,
        expiresIn: "24h",
      }
    );

    return response.status(201).send({
      message: "Usuário cadastrado com sucesso!",
      accessToken,
    });
  });

  fastify.post("/signin", async (request, response) => {
    const loginUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = loginUserBody.parse(request.body);

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return response.status(400).send({
        message: "Oops! Usuário ou senha inválidos."
      });
    }

    const passwordIsValid = await compare(
      password, user.password
    );

    if (!passwordIsValid) {
      return response.status(400).send({
        message: "Oops! Usuário ou senha inválidos."
      });
    }

    const accessToken = fastify.jwt.sign(
      { 
        id: user.id,
        username: user.username
      },
      {
        sub: user.id,
        expiresIn: "24h",
      }
    );

    return response.status(201).send({
      message: "Usuário logado com sucesso!",
      accessToken,
    });

  });

  fastify.get("/account", { onRequest: [authenticate] }, async (request, response) => {
    const accountData = await prisma.users.findUnique({
      where: { id: request.user.sub },
      select: {
        id: true,
        username: true,
        account: true
      }
    });

    if (!accountData) {
      return response.status(400).send({
        message: "Oops! Não foi possível carregar os seus dados."
      });
    }

    return response.status(200).send({
      message: "Sucesso ao buscar dados da conta!",
      accountData
    });
  });
}
