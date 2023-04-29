import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import filmeUp from './controllers/filmes';

dotenv.config()

const server = fastify({
  logger: true
});

server.register(cors);

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});

server.post('/filmes', filmeUp);

const PORT: any = process.env.PORT;


server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});