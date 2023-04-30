"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var dotenv = __toESM(require("dotenv"));
var import_client6 = require("@prisma/client");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/animals/criarAnimaisServices.ts
var CriarAnimaisServices = class {
  async execute({ nome, especie, idade, vacinado }) {
    const product = await prisma_default.animal.create({
      data: {
        nome,
        especie,
        idade,
        vacinado
      }
    });
    return product;
  }
};

// src/server.ts
var import_zod2 = require("zod");

// src/escolaModel.ts
var import_client2 = require("@prisma/client");
var prisma = new import_client2.PrismaClient();
var criarEscola = async (data) => {
  const escola = await prisma.escola.create({ data });
  return escola;
};
var listarEscolas = async () => {
  const escola = await prisma.escola.findMany();
  return escola;
};

// src/escolaController.ts
var create = async (req, res) => {
  try {
    const escola = await criarEscola(req.body);
    res.status(200).send(escola);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
var listAll = async (req, res) => {
  try {
    const escola = await listarEscolas();
    res.status(200).send(escola);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

// src/controllers/tasks.ts
var import_client3 = require("@prisma/client");
var z = __toESM(require("zod"));
var prisma2 = new import_client3.PrismaClient();
var TaskBody = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  priority: z.number().min(1).max(5),
  completed: z.boolean()
});
async function getAllTasks() {
  const tasks = await prisma2.task.findMany();
  return tasks;
}
async function getTaskById(request, reply) {
  try {
    const id = request.params.id;
    const task = await prisma2.task.findUnique({ where: { id } });
    if (!task) {
      reply.code(404).send({ error: "Tarefa n\xE3o encontrada" });
      return;
    }
    return task;
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}
async function createTask(request, reply) {
  try {
    const { title, description, priority, completed } = request.body;
    const task = await prisma2.task.create({
      data: {
        title,
        description,
        priority,
        completed
      }
    });
    reply.status(201).send({ message: "Task criada com sucesso!" });
    return task;
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}
async function updateTask(request, reply) {
  try {
    const id = request.params.id;
    const { title, description } = request.body;
    const task = await prisma2.task.update({ where: { id }, data: { title, description } });
    return task;
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}
async function deleteTask(request, reply) {
  try {
    const id = request.params.id;
    const task = await prisma2.task.delete({ where: { id } });
    reply.status(200).send({ message: "Task deletada com sucesso!" });
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}

// src/controllers/Filmes/filmes.ts
var import_zod = require("zod");
var import_client4 = require("@prisma/client");
var prisma3 = new import_client4.PrismaClient();
var filmeSchema = import_zod.z.object({
  titulo: import_zod.z.string(),
  descricao: import_zod.z.string(),
  duracao: import_zod.z.number().int(),
  em_cartaz: import_zod.z.boolean()
});
var filmeUp = async (request, reply) => {
  try {
    const filme = filmeSchema.parse(request.body);
    const novoFilme = await prisma3.filme.create({
      data: filme
    });
    console.log("salvou o filme", filme);
    reply.status(201).send({ success: true, data: filme, message: "Filme foi salvado com sucesso" });
  } catch (error) {
    console.error(error);
    reply.status(400).send({ success: false, message: "Erro ao salvar filme, tente novamente" });
  }
};
var filmes_default = filmeUp;

// src/controllers/Filmes/getFilmes.ts
var import_client5 = require("@prisma/client");
var prisma4 = new import_client5.PrismaClient();
var buscarFilmes = async (request, reply) => {
  try {
    const filmes = await prisma4.filme.findMany();
    console.log("lista de filmes", filmes);
    reply.status(200).send({ success: true, data: filmes, message: "Lista de filmes" });
  } catch (error) {
    console.error("Erro na busca de filmes", error);
    reply.status(500).send({ success: false, message: "Erro ao buscar filmes" });
  }
};
var getFilmes_default = buscarFilmes;

// src/server.ts
var prisma5 = new import_client6.PrismaClient({
  log: ["query"]
});
dotenv.config();
var server = (0, import_fastify.default)({
  logger: true
});
server.register(import_cors.default);
var prismaElison = new import_client6.PrismaClient();
server.get("/", async (request, reply) => {
  return { msg: "Prova Final" };
});
server.get("/animais", async (request, reply) => {
  const animais = await prismaElison.animal.findMany();
  return animais;
});
server.post("/animais", async (request, reply) => {
  const { nome, especie, idade, vacinado } = request.body;
  const criarAnimaisService = new CriarAnimaisServices();
  const animal = await criarAnimaisService.execute({ nome, especie, idade, vacinado });
  return animal;
});
server.post("/filmes", filmes_default);
server.get("/filmes", getFilmes_default);
server.get("/escola", listAll);
server.post("/escola", create);
server.get("/tasks", async (request, reply) => {
  return getAllTasks();
});
server.get("/dragQueens", async (request, reply) => {
  try {
    const dragQueens = await prisma5.dragQueen.findMany({});
    reply.send(dragQueens);
  } catch (error) {
    console.error(error);
    reply.status(400).send({ message: "Erro ao buscar Drag queens!" });
  }
});
var dragQueenBody = import_zod2.z.object({
  name: import_zod2.z.string(),
  season: import_zod2.z.number(),
  winner: import_zod2.z.boolean(),
  info: import_zod2.z.string().optional()
});
server.post("/dragQueens/create", async (request, reply) => {
  try {
    const dragQueen = dragQueenBody.parse(request.body);
    const newDragQueen = await prisma5.dragQueen.create({
      data: dragQueen
    });
    reply.status(201).send({ message: "Drag queen criada com sucesso!" });
    console.log(`Drag queen ${dragQueen.name}, season=${dragQueen.season}, info=${dragQueen.info}, winner=${dragQueen.winner}`);
  } catch (error) {
    console.error(error);
    reply.status(400).send({ message: "Erro ao criar Drag queen!" });
  }
});
var param = import_zod2.z.object({
  id: import_zod2.z.number()
});
server.delete("/dragQueens/delete/:id", async (request, reply) => {
  try {
    const { id } = param.parse(request.params);
    await prisma5.dragQueen.delete({
      where: {
        id
      }
    });
    reply.status(200).send({ message: "Drag queen deletada com sucesso!" });
  } catch (error) {
    console.error(error);
    reply.status(400).send({ message: "Erro ao deletar Drag queen!" });
  }
});
server.get("/tasks/:id", async (request, reply) => {
  return getTaskById(request, reply);
});
server.post("/tasks/create", async (request, reply) => {
  return createTask(request, reply);
});
server.put("/tasks/:id", async (request, reply) => {
  return updateTask(request, reply);
});
server.delete("/tasks/:id", async (request, reply) => {
  return deleteTask(request, reply);
});
var PORT = process.env.PORT;
server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
