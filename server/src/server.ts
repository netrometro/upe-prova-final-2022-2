import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { CriarAnimaisServices } from './services/animals/criarAnimaisServices';

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

interface Animal {
  nome: string;
  especie: string;
  idade: number;
  vacinado: boolean;
}

server.post('/animais', async (request, reply) => {
  const { nome, especie, idade, vacinado } = request.body as Animal;
  const criarAnimaisService = new CriarAnimaisServices();
  const animal = await criarAnimaisService.execute({ nome, especie, idade, vacinado });
  return animal;
});

const PORT: any = process.env.PORT;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});