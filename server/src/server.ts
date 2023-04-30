import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { PrismaClient, Livro } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
})

dotenv.config()

const server = fastify({
  logger: true
});

server.register(cors);

interface LivroBody {
  titulo: string;
  descricao?: string;
  autor?: string;
  disponivel?: boolean;
}

interface LivroParams {
  id: number;
}

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});

server.post<{ Body: LivroBody }>('/livros/create', async (request, reply) => {
  try {
    const { titulo, descricao, autor, disponivel = true } = request.body;
    const livro = await prisma.livro.create({
      data: {
        titulo,
        descricao,
        autor,
        disponivel,
      },
    });
    reply.status(201).send({ message: 'Livro criado com sucesso!', livro });
    console.log(`Livro ${titulo}, descricao=${descricao}, autor=${autor}, disponivel=${disponivel}`);
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
    const { titulo, descricao, autor, disponivel } = request.body;
    const livro = await prisma.livro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        autor,
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