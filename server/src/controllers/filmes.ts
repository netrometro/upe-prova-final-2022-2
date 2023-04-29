import fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from 'fastify';

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
    reply.status(201).send({success: true, data: filme, message: "Filme foi salvado com sucesso"});
  } catch (error) {
    console.error(error);
    reply.status(400).send({ success: false, message: "Erro ao salvar filme, tente novamente" });
  }

};

export default filmeUp;

