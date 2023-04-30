import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "./controllers/tasks";

dotenv.config()

const server = fastify({
  logger: true
});

server.register(cors);

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});

server.get('/tasks', async (request, reply) => {
  return getAllTasks();
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