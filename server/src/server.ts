import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
})


dotenv.config()

const server = fastify({
  logger: true
});

server.register(cors);

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});

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

interface IdragQueenBody {
  name: string;
  season: number;
  winner: boolean;
  info?: string;


};

server.post<{Body: IdragQueenBody}>('/dragQueens/create', async (request, reply) => {   
  
  try{
      const {name, season, winner, info} = request.body;
      await prisma.dragQueen.create({
          
          data: {
              name,
              season, 
              winner, 
              info
          },

      })

      reply.status(201).send({message: 'Drag queen criada com sucesso!'});
      console.log(`Drag queen ${name}, season=${season}, info=${info}, winner=${winner}`);
  } catch (error) {
          
      console.error(error);
      
      reply.status(400).send({message: 'Erro ao criar Drag queen!'});
      
  }
})

interface IdragQueenByIdParam {
        
  id: number;
  
};

server.delete<{Params: IdragQueenByIdParam}>('/dragQueens/delete/:id', async (request, reply) => {
  try{
      const {id} = request.params;
      
      await prisma.dragQueen.delete({

      where: { id: Number(id) }
      
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