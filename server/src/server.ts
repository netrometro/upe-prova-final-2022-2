import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { CriarAnimaisServices } from './services/animals/criarAnimaisServices';

import { z } from 'zod';
import { create, listAll } from './escolaController';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "./controllers/tasks";

const prisma = new PrismaClient({
  log: ['query'],
})

dotenv.config()

const server = fastify({
  logger: true
});

server.register(cors);

const prismaElison = new PrismaClient();

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});

server.get('/animais', async (request, reply) => {
  const animais = await prismaElison.animal.findMany();
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

server.get('/escola', listAll)
server.post('/escola', create)
server.get('/tasks', async (request, reply) => {
  return getAllTasks();
})

server.get('/dragQueens', async (request, reply) => {
        
  try{ 
      const dragQueens = await prisma.dragQueen.findMany({
      });
      reply.send(dragQueens);
  
  } catch (error) {
      
      console.error(error);
      reply.status(400).send({message: 'Erro ao buscar Drag queens!'});
  }
})

const dragQueenBody = z.object({
  name: z.string(),
  season: z.number(),
  winner: z.boolean(),
  info: z.string().optional(),
});

server.post('/dragQueens/create', async (request, reply) => {   
  
  try{
      
      const dragQueen = dragQueenBody.parse(request.body);
      const newDragQueen = await prisma.dragQueen.create({
        data: dragQueen,
      });
      reply.status(201).send({message: 'Drag queen criada com sucesso!'});
      console.log(`Drag queen ${dragQueen.name}, season=${dragQueen.season}, info=${dragQueen.info}, winner=${dragQueen.winner}`);
  } catch (error) {
          
      console.error(error);
      
      reply.status(400).send({message: 'Erro ao criar Drag queen!'});
      
  }
})

server.get("/tasks/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
  return getTaskById(request, reply);
})

server.post<{ Body: { title: string; description: string; priority: number; completed: boolean; } }>("/tasks/create", async (request, reply) => {
  return createTask(request, reply);
})

server.put("/tasks/:id", async (request: FastifyRequest<{ Params: { id: string }, Body: { title?: string, description?: string, priority?: number, completed?: boolean } }>, reply: FastifyReply) => {
  return updateTask(request, reply);
})

server.delete('/tasks/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
  return deleteTask(request, reply);
})



const PORT: any = process.env.PORT;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});