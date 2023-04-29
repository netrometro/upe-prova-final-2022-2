import { FastifyRequest, FastifyReply } from 'fastify';
import { criarEscola, listarEscolas } from './escolaModel'

export const create = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
try {
const escola = await criarEscola(req.body);
res.status(200).send(escola);
} catch (e) {
console.log(e);
res.status(400).send(e);
}
}

export const listAll = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
try {
const escola = await listarEscolas();
res.status(200).send(escola);
} catch (e) {
console.log(e);
res.status(400).send(e);
}
}