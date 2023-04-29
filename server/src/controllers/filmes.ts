import fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

interface FastifyRequest {
  body: {
    titulo: string;
    descricao: string;
    duracao: number;
    em_cartaz: boolean;
  };
}

interface FastifyReply {
  send(data: any): FastifyReply;
  status(statusCode: number): FastifyReply;
}


dotenv.config();

const server = fastify({
  logger: true,
});

server.register(cors);

const prisma = new PrismaClient();

const filmeSchema = z.object({
  titulo: z.string(),
  descricao: z.string(),
  duracao: z.number().int(),
  em_cartaz: z.boolean(),
});
export const filmeUp = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const filme = filmeSchema.parse(request.body);
    const novoFilme = await prisma.filme.create({
      data: filme,
    });
    console.log("salvou o filme", filme);
    reply.status(201).send(novoFilme);
  } catch (error) {
    console.error(error);
    reply.status(400).send({ mensagem: "Dados inválidos" });
  }

};

export default filmeUp;

