import { create, listAll } from './escolaController';

import fastify from 'fastify';

const server = fastify({
    logger: true
  });

exports.dreamBoxRoutes = (server:any) => {
    server.post("/escola", create);
    server.get("/escola", listAll);
}