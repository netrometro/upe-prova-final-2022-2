import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { taskSchema } from "../schemas";
import { FastifyRequest, FastifyReply } from "fastify";
import * as z from 'zod';

const prisma = new PrismaClient();

export const TaskBody = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  priority: z.number().min(1).max(5),
  completed: z.boolean(),
});


export async function getAllTasks() {
    const tasks = await prisma.task.findMany();
    return tasks;
}

export async function getTaskById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const id = request.params.id;
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      reply.code(404).send({ error: "Tarefa não encontrada" });
      return;
    }
    return task;
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}

  export async function createTask(request: FastifyRequest<{ Body: { title: string, description: string, priority: number, completed: boolean} }>, reply: FastifyReply) {
    try {
      const { title, description, priority, completed } = request.body;
      const task = await prisma.task.create({ 
        data: 
        { title, 
          description, 
          priority, 
          completed} 
        });
        reply.status(201).send({message: 'Task criada com sucesso!'});
      return task;
    } catch (err) {
      reply.code(500).send({ error: "Internal server error" });
    }
  }


  export async function updateTask(request: FastifyRequest<{ Params: { id: string }, Body: { title?: string, description?: string, priority?: number, completed?: boolean } }>, reply: FastifyReply) {
  try {
    const id = request.params.id;
    const { title, description } = request.body;
    const task = await prisma.task.update({ where: { id }, data: { title, description } });

    return task;
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}


export async function deleteTask(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const id = request.params.id;
    const task = await prisma.task.delete({ where: { id } });


    reply.status(200).send({message: 'Task deletada com sucesso!'});
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }

}

