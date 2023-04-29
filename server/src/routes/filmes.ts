import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { ZodSchema } from 'zod';

const prisma = new PrismaClient();

const filmeSchema = {
  body: {
    type: 'object',
    properties: {
      titulo: { type: 'string' },
      descricao: { type: 'string' },
      duracao: { type: 'integer' },
      em_cartaz: { type: 'boolean' },
    },
    required: ['titulo', 'descricao', 'duracao', 'em_cartaz', 'user'],
  },
};


async function filmeRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { titulo: string; descricao: string; duracao: number; em_cartaz: boolean } }>(
    '/filmes',
    { schema: filmeSchema },
    async (request, reply) => {
      const { titulo, descricao, duracao, em_cartaz } = request.body;

      try {
        const filme = await prisma.filme.create({
          data: {
            titulo,
            descricao,
            duracao,
            em_cartaz,
          },
        });

        console.log("Filme criado com sucesso");
        return filme;
      } catch (err) {
        reply.status(500).send({ message: 'Erro ao criar filme' });
      }
    },
  );
}

//   fastify.get<{ Params: { id: string } }>('/filme/:id', async (request, reply) => {
//     const { id } = request.params;

//     try {
//       const filme = await prisma.filme.findUnique({
//         where: { id: Number(id) },
//       });

//       if (!filme) {
//         reply.status(404).send({ message: 'Filme não encontrado' });
//       }

//       return filme;
//     } catch (err) {
//       reply.status(500).send({ message: 'Erro ao buscar filme' });
//     }
//   });

//   fastify.get('/filme', async () => {
//     try {
//       const filmes = await prisma.filme.findMany();

//       return filmes;
//     } catch (err) {
//       reply.status(500).send({ message: 'Erro ao buscar filmes' });
//     }
//   });
// }

export default filmeRoutes;
