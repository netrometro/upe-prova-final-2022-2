const fastify = require('fastify')()
const prisma = require('@prisma/client')

fastify.register(require('fastify-cors'))

// Configuração do Prisma
const db = new prisma.PrismaClient()

// Rota para listar todos os animais
fastify.get('/animais', async (request, reply) => {
  const animais = await db.animal.findMany()
  reply.send(animais)
})

// Rota para buscar um animal pelo ID
fastify.get('/animais/:id', async (request, reply) => {
  const animal = await db.animal.findUnique({
    where: { id: Number(request.params.id) }
  })
  if (!animal) {
    reply.status(404).send({ error: 'Animal não encontrado' })
    return
  }
  reply.send(animal)
})

// Rota para criar um novo animal
fastify.post('/animais', async (request, reply) => {
  const novoAnimal = await db.animal.create({
    data: {
      nome: request.body.nome,
      descricao: request.body.descricao,
      idade: request.body.idade,
      adotado: request.body.adotado
    }
  })
  reply.send(novoAnimal)
})

// Rota para atualizar um animal existente
fastify.put('/animais/:id', async (request, reply) => {
  const animal = await db.animal.findUnique({
    where: { id: Number(request.params.id) }
  })
  if (!animal) {
    reply.status(404).send({ error: 'Animal não encontrado' })
    return
  }
  const animalAtualizado = await db.animal.update({
    where: { id: Number(request.params.id) },
    data: {
      nome: request.body.nome || animal.nome,
      descricao: request.body.descricao || animal.descricao,
      idade: request.body.idade || animal.idade,
      adotado: request.body.adotado || animal.adotado
    }
  })
  reply.send(animalAtualizado)
})

// Rota para deletar um animal existente
fastify.delete('/animais/:id', async (request, reply) => {
  const animal = await db.animal.findUnique({
    where: { id: Number(request.params.id) }
  })
  if (!animal) {
    reply.status(404).send({ error: 'Animal não encontrado' })
    return
  }
  await db.animal.delete({
    where: { id: Number(request.params.id) }
  })
  reply.send({ message: 'Animal deletado com sucesso' })
})

// Inicia o servidor
fastify.listen(3000, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Servidor iniciado na porta 3000')
})