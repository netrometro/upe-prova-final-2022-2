"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/tasks.ts
var tasks_exports = {};
__export(tasks_exports, {
  TaskBody: () => TaskBody,
  createTask: () => createTask,
  deleteTask: () => deleteTask,
  getAllTasks: () => getAllTasks,
  getTaskById: () => getTaskById,
  updateTask: () => updateTask
});
module.exports = __toCommonJS(tasks_exports);
var import_client = require("@prisma/client");
var z = __toESM(require("zod"));
var prisma = new import_client.PrismaClient();
var TaskBody = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  priority: z.number().min(1).max(5),
  completed: z.boolean()
});
async function getAllTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}
async function getTaskById(request, reply) {
  try {
    const id = request.params.id;
    const task = await prisma.task.findUnique({ where: { id } });
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
    const task = await prisma.task.create({
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
    const task = await prisma.task.update({ where: { id }, data: { title, description } });
    return task;
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}
async function deleteTask(request, reply) {
  try {
    const id = request.params.id;
    const task = await prisma.task.delete({ where: { id } });
    reply.status(200).send({ message: "Task deletada com sucesso!" });
  } catch (err) {
    reply.code(500).send({ error: "Internal server error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskBody,
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask
});
