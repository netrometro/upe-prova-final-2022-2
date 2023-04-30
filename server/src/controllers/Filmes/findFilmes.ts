import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

const prisma = new PrismaClient();

export const FiltrarFilmes = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { busca } = request.query as { busca: string };

    if (!busca || busca.length === 0) {
      return reply.status(400).send({ success: false, message: 'Por favor, forneça um termo de busca válido.' });
    }

    const filmes = await prisma.filme.findMany({
      where: {
        titulo: { contains: busca }, // Filtrar os filmes pelo termo de busca
      },
    });

    console.log("lista de filmes", filmes);

    if (filmes.length === 0) {
      return reply.status(404).send({ success: false, message: 'Não foram encontrados filmes com essa palavra.' });
    }

    reply
      .status(200)
      .send({ success: true, data: filmes, message: "Lista de filmes" });
  } catch (error) {
    console.error("Erro na busca de filmes", error);
    reply
      .status(500)
      .send({ success: false, message: "Erro ao buscar filmes" });
  }
};

export default FiltrarFilmes;
