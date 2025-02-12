import jwt from "jsonwebtoken";
import env from "../utils/env";
import prisma from "../databaseClient";

interface Payload {
  userID: string; // CPF
}

function encode(payload: Payload) {
  return jwt.sign(payload, env.PRIVATE_KEY, {
    expiresIn: "2 days",
  });
}

function verify(token: string) {
  return jwt.verify(token, env.PRIVATE_KEY);
}

async function login(cpf: string, pass: string) {
  const user = await prisma.user.findUnique({
    where: {
      cpf,
    },
    select: {
      password: true,
      status: true,
    },
  });

  if (user === null || user.password !== pass) {
    throw new Error("Usuário não encontrado ou senha inválida");
  }

  if (!user?.status) {
    throw new Error("Perfil desativado. Converse com o seu gerente.");
  }

  // Retorna um jwt com payload contendo o ID (cpf) do usuario
  return encode({ userID: cpf });
}

async function getUserByToken(token: string) {
  const payload = verify(token) as Payload;

  const user = await prisma.user.findUnique({
    where: {
      cpf: payload.userID,
    },
    select: {
      cpf: true,
      name: true,
      email: true,
      isAdmin: true,
      isManager: true,
      isTelemarketing: true,
      status: true,
      designatedCnpjs: true
    },
  });

  return user;
}

export default {
  encode,
  verify,
  login,
  getUserByToken,
};
