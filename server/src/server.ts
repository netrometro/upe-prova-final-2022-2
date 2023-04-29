import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import filmeRoutes from "./routes/filmes";

dotenv.config()

const server = fastify({
  logger: true
});

server.register(cors);

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});

const prisma = new PrismaClient();

const filmeSchema = z.object({
  titulo: z.string(),
  descricao: z.string(),
  duracao: z.number().int(),
  em_cartaz: z.boolean(),
});

server.post('/filmes', async (request, reply) => {
  try {
    const filme = filmeSchema.parse(request.body);
    const novoFilme = await prisma.filme.create({
      data: filme,
    });
    console.log("salvou o filme", filme);
    reply.status(201).send(novoFilme);
  } catch (error) {
    console.error(error);
    reply.status(400).send({ mensagem: 'Dados inválidos' });
  }
});

const PORT: any = process.env.PORT;
// const PORT = 3333;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});