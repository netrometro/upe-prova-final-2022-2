import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from 'fastify';


const prisma = new PrismaClient();

export const FiltrarFilmes = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const query = request.query as Record<string, unknown>;
    const filmes = await prisma.filme.findMany({
      where: {
        OR: [
          { titulo: { contains: query.busca as string } },
        ]
      }
    });
    console.log("lista de filmes", filmes);
    reply.status(200).send({success: true, data: filmes, message: "Lista de filmes"});
  } catch (error) {
    console.error("Erro na busca de filmes", error);
    reply.status(500).send({ success: false, message: "Erro ao buscar filmes" });
  }
};

// export const FiltrarFilmes = async (request: FastifyRequest, reply: FastifyReply) => {
//   try {
//     const { busca } = request.params; // Recebe a string de busca como parâmetro na rota
//     const filmes = await prisma.filme.findMany(); // Busca todos os filmes no banco de dados
//     const filmesFiltrados = filmes.filter(filme =>
//       // Verifica se o título, descrição ou qualquer outro atributo contém a sequência de caracteres fornecida na busca
//       Object.values(filme).some(value =>
//         typeof value === 'string' && value.toLowerCase().includes(busca.toLowerCase())
//       )
//     );
//     console.log("Filme foi filtrado")
//     reply.send({ success: true, data: filmesFiltrados }); // Retorna os filmes filtrados
//   } catch (error) {
//     console.error(error);
//     reply.status(400).send({ success: false, message: "Erro ao buscar filmes" });
//   }
// }


export default FiltrarFilmes;

