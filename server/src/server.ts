import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { CriarAnimaisServices } from './services/animals/criarAnimaisServices';
import { z } from 'zod';
import { create, listAll } from './escolaController';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "./controllers/tasks";
import filmeUp from "./controllers/Filmes/filmes";
import buscarFilmes from "./controllers/Filmes/getFilmes";
import FiltrarFilmes from './controllers/Filmes/findFilmes';

const prisma = new PrismaClient({
  log: ['query'],
})

dotenv.config()

const server = fastify({
  logger: true,
});

server.register(cors);

const prismaElison = new PrismaClient();

server.get('/teste', async (request, reply) => {
  return { msg: "ok"};
});

interface LivroBody {
  titulo: string;
  descricao?: string;
  autor?: string;
  quantidade: number;
  disponivel?: boolean;
}

interface LivroParams {
  id: number;
}

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

server.post("/filmes", filmeUp);
server.get("/filmes", buscarFilmes);
server.get("/Filtrarfilmes", FiltrarFilmes);
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
      console.log(newDragQueen);
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


server.post<{ Body: LivroBody }>('/livros/create', async (request, reply) => {
  try {
    const { titulo, descricao, autor, quantidade, disponivel = true } = request.body;
    const livro = await prisma.livro.create({
      data: {
        titulo,
        descricao,
        autor,
        quantidade,
        disponivel,
      },
    });
    reply.status(201).send({ message: 'Livro criado com sucesso!', livro });
    console.log(`Livro ${titulo}, descricao=${descricao}, autor=${autor}, quantidade=${quantidade}, disponivel=${disponivel}`);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ao criar Livro!' });
  }
});

server.get('/livros', async (_request, reply) => {
  try {
    const livros = await prisma.livro.findMany({});
    reply.send(livros);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ao buscar livros!' });
  }
});

server.put<{ Params: LivroParams; Body: LivroBody }>('/livros/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const { titulo, descricao, autor, quantidade, disponivel } = request.body;
    const livro = await prisma.livro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        autor,
        quantidade,
        disponivel,
      },
    });
    reply.send({ message: 'Livro atualizado com sucesso!', livro });
    console.log(`Livro ${titulo}, descricao=${descricao}, autor=${autor}, disponivel=${disponivel}`);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ao atualizar Livro!' });
  }
});

server.delete<{ Params: { id: string } }>('/livros/delete/:id', async (request, reply) => {
  try {
    const id = Number(request.params.id);
    await prisma.livro.delete({ where: { id } });
    reply.status(200).send({ message: 'Livro deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ao deletar Livro!' });
  }
});

server.get<{ Params: LivroParams }>('/livros/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const livro = await prisma.livro.findUnique({
      where: { id: Number(id) },
    });
    if (!livro) {
      reply.status(404).send({ message: 'Livro não encontrado!' });
    }
    reply.send(livro);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ao buscar Livro!' });
  }
});

server.get<{ Params: { query: string } }>('/livros/search/:query', async (request, reply) => {
  try {
    const { query } = request.params;
    const livros = await prisma.livro.findMany({
      where: {
        OR: [
          { titulo: { contains: query } },
          { descricao: { contains: query } },
          { autor: { contains: query } }
        ]
      }
    });
    console.log('chegou', livros)
    reply.send(livros);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ao buscar livros!' });
  }
});

const PORT: any = process.env.PORT;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
