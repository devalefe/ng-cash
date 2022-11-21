import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

import z from "zod";

import { authenticate } from "../plugins/authenticate";

interface DateIntervalBodyProps {
  initialDate: Date;
  finalDate: Date;
  type: string;
}

export async function transactionsRoutes(fastify: FastifyInstance) {
  fastify.post("/transactions" , { onRequest: [authenticate] }, async (request, response) => {
    const transactionsDateInterval = z.object({
      initialDate: z.date(),
      finalDate: z.date(),
      type: z.string().optional()
    });

    let { initialDate, finalDate, type } = request.body as DateIntervalBodyProps;

    if(!initialDate) initialDate = new Date("1999-01-01");
    if(!finalDate) finalDate = new Date();
    
    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    initialDate.setHours(21,0,0,0);
    finalDate.setHours(20,59,59,999);

    finalDate.setDate(finalDate.getDate() + 1);

    const dateInterval = transactionsDateInterval.parse({ initialDate, finalDate });

    if(dateInterval.initialDate > dateInterval.finalDate) {
      return response.status(400).send({
        message: "Oops! Intervalo de datas não permitido.",
      });
    }

    if(type === "cashIn") {
      const cashInOutData = await prisma.transactions.findMany({
        where: {
          AND :[
            { cashIn: { user: { id: request.user.sub } } },
            { createdAt: { gte: initialDate } },
            { createdAt: { lte: finalDate } },
          ]
        },
        include: {
          cashIn: {
            select: { 
              user: { select: { username: true } }
            }
          },
          cashOut: {
            select: { 
              user: { select: { username: true } }
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }).then(
        transactions => (
          transactions.map(
            transaction => ({
              id: transaction.id,
              to: transaction.cashIn.user?.username,
              from: transaction.cashOut.user?.username,
              incoming: transaction.cashIn.user?.username === request.user.username,
              value: Number(transaction.value.toFixed(2)),
              createdAt: transaction.createdAt,
            })
          )
        )
      );
  
      return response.status(200).send({
        message: "Sucesso ao buscar transações!",
        cashInOutData
      });
    }

    if(type === "cashOut") {
      const cashInOutData = await prisma.transactions.findMany({
        where: {
          AND :[
            { cashOut: { user: { id: request.user.sub } } },
            { createdAt: { gte: initialDate } },
            { createdAt: { lte: finalDate } },
          ]
        },
        include: {
          cashIn: {
            select: { 
              user: { select: { username: true } }
            }
          },
          cashOut: {
            select: { 
              user: { select: { username: true } }
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }).then(
        transactions => (
          transactions.map(
            transaction => ({
              id: transaction.id,
              to: transaction.cashIn.user?.username,
              from: transaction.cashOut.user?.username,
              incoming: transaction.cashIn.user?.username === request.user.username,
              value: Number(transaction.value.toFixed(2)),
              createdAt: transaction.createdAt,
            })
          )
        )
      );
  
      return response.status(200).send({
        message: "Sucesso ao buscar transações!",
        cashInOutData
      });
    }

    const cashInOutData = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            AND: [
              { cashOut: { user: { id: request.user.sub } } },
              { createdAt: { gte: initialDate } },
              { createdAt: { lte:  finalDate} },
            ]
          },
          {
            AND: [
              { cashIn: { user: { id: request.user.sub } } },
              { createdAt: { gte: initialDate } },
              { createdAt: { lte: finalDate } },
            ]
          }
        ]
      },
      include: {
        cashIn: {
          select: { 
            user: { select: { username: true } }
          }
        },
        cashOut: {
          select: { 
            user: { select: { username: true } }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    }).then(
      transactions => (
        transactions.map(
          transaction => ({
            id: transaction.id,
            to: transaction.cashIn.user?.username,
            from: transaction.cashOut.user?.username,
            incoming: transaction.cashIn.user?.username === request.user.username,
            value: Number(transaction.value.toFixed(2)),
            createdAt: transaction.createdAt,
          })
        )
      )
    );

    return response.status(200).send({
      message: "Sucesso ao buscar transações!",
      cashInOutData
    });
  });

  fastify.get("/transactions/today" , { onRequest: [authenticate] }, async (request, response) => {
    let initialDate = new Date(new Date().setHours(0,0,0,0));
    let finalDate = new Date();

    initialDate = new Date(initialDate.toLocaleString('en-US', { timeZone: "America/Sao_Paulo" }));
    finalDate = new Date(finalDate.toLocaleString('en-US', { timeZone: "America/Sao_Paulo" }));

    const cashOutSum = await prisma.transactions.aggregate({
      where: {
        AND: [
          { cashOut: { user: { id: request.user.sub } } },
          { createdAt: { gte: initialDate } },
          { createdAt: { lte: finalDate } },
        ]
      },
      _sum: {
        value: true
      }
    });

    const cashInSum = await prisma.transactions.aggregate({
      where: {
        AND: [
          { cashIn: { user: { id: request.user.sub } } },
          { createdAt: { gte: initialDate } },
          { createdAt: { lte: finalDate } },
        ]
      },
      _sum: {
        value: true
      }
    });

    const cashInOutData = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            AND: [
              { cashOut: { user: { id: request.user.sub } } },
              { createdAt: { gte: initialDate } },
              { createdAt: { lte:  finalDate} },
            ]
          },
          {
            AND: [
              { cashIn: { user: { id: request.user.sub } } },
              { createdAt: { gte: initialDate } },
              { createdAt: { lte: finalDate } },
            ]
          }
        ]
      },
      include: {
        cashIn: {
          select: { 
            user: { select: { username: true } }
          }
        },
        cashOut: {
          select: { 
            user: { select: { username: true } }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    }).then(
      transactions => (
        transactions.map(
          transaction => ({
            id: transaction.id,
            to: transaction.cashIn.user?.username,
            from: transaction.cashOut.user?.username,
            incoming: transaction.cashIn.user?.username === request.user.username,
            value: Number(transaction.value.toFixed(2)),
            createdAt: transaction.createdAt,
          })
        )
      )
    );

    return response.status(200).send({
      message: "Sucesso ao buscar transações!",
      cashOutTotal: Number(cashOutSum._sum.value?.toFixed(2)),
      cashInTotal: Number(cashInSum._sum.value?.toFixed(2)),
      cashInOutData
    });
  });

  fastify.post("/transactions/new", { onRequest: [authenticate] }, async (request, response) => {
    const validateAccountUsername = z.object({
      username: z
      .string({
        required_error: "Usuário inválido.",
      }),
      value: z
      .number({
        required_error: "Digite um valor para tranferir.",
        invalid_type_error: "Valor inválido."
      })
      .min(0.01, {
        message: "O valor mínimo é de R$ 0,01"
      }),
    });

    const { username, value } = validateAccountUsername.parse(request.body);
    
    try {
      const senderAccount = await prisma.users.findFirstOrThrow({
        where: { id: request.user.sub },
        select: { account: true }
      });

      if(senderAccount.account.balance < value) {
        return response.status(400).send({
          message: "Oops! Você não tem fundos o suficiente."
        });
      }


      const recipientAccount = await prisma.users.findUnique({
        where: { username },
        select: { account: true, id: true }
      });

      if(!recipientAccount) {
        return response.status(400).send({
          message: "Oops! Destinatário não encontrado."
        });
      }
      
      if(request.user.sub === recipientAccount.id) {
        return response.status(400).send({
          message: "Oops! Tipo de transação não permitida."
        });
      }


      await prisma.accounts.update({
        where: { id: recipientAccount.account.id },
        data: { balance: Number((recipientAccount.account.balance + value).toFixed(2)) }
      });


      await prisma.accounts.update({
        where: { id: senderAccount.account.id },
        data: { balance: Number((senderAccount.account.balance - value).toFixed(2)) }
      });


      await prisma.transactions.create({
        data: {
          debitedAccountId: senderAccount.account.id,
          creditedAccountId: recipientAccount.account.id,
          value:  Number(value.toFixed(2))
        }
      });

      return response.status(200).send({
        message: "Tranferência efetuada com sucesso!"
      });

    } catch(error) {
      console.log(error);
      
      return response.status(500).send({ 
        message: "Oops! Erro ao fazer transferência."
      });
    }
  });
}
