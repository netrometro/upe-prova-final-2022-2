import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { create, listAll } from './escolaController';
import filmeUp from "./controllers/filmes";
import buscarFilmes from "./controllers/getFilmes";

const prisma = new PrismaClient({
  log: ['query'],
})

dotenv.config()

const server = fastify({
  logger: true,
});

server.register(cors);

server.get("/", async (request, reply) => {
  return { msg: "Prova Final" };
});

server.post("/filmes", filmeUp);
server.get("/filmes", buscarFilmes);
server.get('/escola', listAll)
server.post('/escola', create)

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

const param = z.object({
  id: z.number(),
});

server.delete('/dragQueens/delete/:id', async (request, reply) => {
  try{
      const {id} = param.parse(request.params);
      
      await prisma.dragQueen.delete({

        where: {
          id: id,
        },
      
      })

      reply.status(200).send({message: 'Drag queen deletada com sucesso!'});
  
  } catch (error) {

      console.error(error);
      reply.status(400).send({message: 'Erro ao deletar Drag queen!'});
  
  }

})
const PORT: any = process.env.PORT;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
