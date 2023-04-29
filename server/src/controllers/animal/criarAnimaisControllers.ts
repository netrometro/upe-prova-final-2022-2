import { FastifyRequest, FastifyReply } from "fastify";
import { CriarAnimaisServices } from '../../services/animals/criarAnimaisServices';

interface Body {
  nome: string;
  especie: string;
  idade: number;
  vacinado: boolean;
}

export class CriarAnimaisController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { nome, especie, idade, vacinado} = req.body as Body;

      const criarAnimaisServices = new CriarAnimaisServices();

      const result = await criarAnimaisServices.execute({ nome, especie, idade, vacinado });

      return res.status(201).send(result);
    } catch (err) {
      console.log(err);
      res.status(404).send({ error: err });
    }
  }
}