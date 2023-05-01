import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from 'fastify';

interface RequestParams {
  id: string;
}

const prisma = new PrismaClient();

const filmeSchema = z.object({
  titulo: z.string(),
  descricao: z.string(),
  duracao: z.number().int(),
  em_cartaz: z.boolean(),
});
export const filmeUpdate = async (request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const filme = filmeSchema.parse(request.body);
    const filmeAtualizado = await prisma.filme.update({
      where: { id: parseInt(id, 10) },
      data: filme,
    });
    console.log("atualizou o filme", filmeAtualizado);
    reply.status(200).send({success: true, data: filmeAtualizado, message: "Filme foi atualizado com sucesso"});
  } catch (error) {
    console.error(error);
    reply.status(400).send({ success: false, message: "Erro ao atualizar filme, tente novamente" });
  }
};

export default filmeUpdate;

