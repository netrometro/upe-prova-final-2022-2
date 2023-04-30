import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

export const buscarFilmes = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const filmes = await prisma.filme.findMany();
    console.log("lista de filmes", filmes);
    reply.status(200).send({success: true, data: filmes, message: "Lista de filmes"});
  } catch (error) {
    console.error("Erro na busca de filmes", error);
    reply.status(500).send({ success: false, message: "Erro ao buscar filmes" });
  }
};


export default buscarFilmes;

