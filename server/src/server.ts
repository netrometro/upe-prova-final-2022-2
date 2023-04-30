import fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config()

const prisma = new PrismaClient();

const server = fastify({
  logger: true
});

server.register(cors);

server.get('/', async (request, reply) => {
  return { msg: "Prova Final" };
});


const PORT: any = process.env.PORT;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

async function bootstrap() {
  const fastify = require('fastify')({ logger: true });

  await fastify.register(cors, {
    origin: 'true',
})

  fastify.get('/genshinweapon/count', async () => {
    const count = await prisma.genshinWeapon.count();

    return { count };
  });

  fastify.post('/genshinweapon', async (request, reply) => {

    const createWeaponBody = z.object({
      name: z.string(),
      description: z.string(),
      atk: z.number(),
      weaponT5: z.boolean(),
    });

    const { name, description, atk, weaponT5 } = createWeaponBody.parse(request.body);

    // o await é para esperar a criação do objeto
    await prisma.genshinWeapon.create({
      data: {
        name,
        description,
        atk,
        weaponT5,
      },
    });

    
    return reply.status(201).send({ name, description, atk, weaponT5 }) 

    //return { name, description, atk, weaponT5 };
  });

  await fastify.listen({ port: 3000 })

}

bootstrap();