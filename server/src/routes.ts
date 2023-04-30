import { FastifyInstance } from 'fastify';
import { CriarAnimaisController } from './controllers/animal/criarAnimaisControllers';
//import { CriarAnimaisServices } from './services/animals/criarAnimaisServices';

export default async function(app: FastifyInstance): Promise<void> {
  // Users
  app.post('/animais', async (request, reply) => {
    const createUserController = new CriarAnimaisController();
    await createUserController.handle(request, reply);
  });

  app.get('/animais', async (request, reply) => {
    const authUserController = new CriarAnimaisController();
    await authUserController.handle(request, reply);
  });

  
}