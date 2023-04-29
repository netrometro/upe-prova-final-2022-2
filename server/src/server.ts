import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config()

const server = fastify({
  logger: true
});

server.register(cors);

const prisma = new PrismaClient();

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});

server.get('/animais', async (request, reply) => {
  const animais = await prisma.animal.findMany();
  return animais;
});

const PORT: any = process.env.PORT;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});