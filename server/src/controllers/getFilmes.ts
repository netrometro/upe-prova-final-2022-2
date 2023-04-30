// import fastify from "fastify";
// import cors from "@fastify/cors";
// import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from 'fastify';

// dotenv.config();

// const server = fastify({
//   logger: true,
// });

// server.register(cors);

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

