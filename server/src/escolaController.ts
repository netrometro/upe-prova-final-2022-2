import { FastifyRequest, FastifyReply } from 'fastify';
import { criarEscola, listarEscolas } from './escolaModel'

export const create = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
try {
const dreambox = await criarEscola(req.body);
res.status(200).send(dreambox);
} catch (e) {
console.log(e);
res.status(400).send(e);
}
}

export const listAll = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
try {
const dreambox = await listarEscolas();
res.status(200).send(dreambox);
} catch (e) {
console.log(e);
res.status(400).send(e);
}
}