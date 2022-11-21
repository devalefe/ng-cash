import { prisma } from "../src/lib/prisma";
import { hash } from "bcrypt";

interface UserSeedProps {
  username: string;
  password: string;
}

async function seedUsers({ username, password }: UserSeedProps) {
  const hashedPassword = await hash(password, 10);

  await prisma.users.create({
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
}

interface TransactionsSeedProps {
  from: string;
  to: string;
}

async function seedTransactions({ from, to }: TransactionsSeedProps) {
  const value = Math.random() * (50 - 0.01);

  const senderAccount = await prisma.users.findFirstOrThrow({
    where: { username: from },
    select: { account: true }
  });

  const recipientAccount = await prisma.users.findUnique({
    where: { username: to },
    select: { account: true, id: true }
  });

  if(senderAccount && recipientAccount) {
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
  }
}

async function main() {
  console.log("================== INICIANDO PROCESSO DE SEED ==================");

  const users = [
    { username: "johndoe", password: "PasswordTest1" },
    { username: "richard", password: "PasswordTest2" },
    { username: "janedoe", password: "PasswordTest3" },
  ]

  
  for (const { username, password } of users) {
    await seedUsers({username: username, password: password});
  }

  const transactions = [
    { from: "johndoe", to: "richard" },
    { from: "richard", to: "janedoe" },
    { from: "janedoe", to: "johndoe" },
    { from: "johndoe", to: "janedoe" },
    { from: "richard", to: "johndoe" },
    { from: "janedoe", to: "richard" }
  ]

  for (const { from, to } of transactions) {
    await seedTransactions({ from: from, to: to });
  }

  console.log("================== PROCESSO DE SEED FINALIZADO ==================");
}

main();
