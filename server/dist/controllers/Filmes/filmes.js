"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/Filmes/filmes.ts
var filmes_exports = {};
__export(filmes_exports, {
  default: () => filmes_default,
  filmeUp: () => filmeUp
});
module.exports = __toCommonJS(filmes_exports);
var import_zod = require("zod");
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var filmeSchema = import_zod.z.object({
  titulo: import_zod.z.string(),
  descricao: import_zod.z.string(),
  duracao: import_zod.z.number().int(),
  em_cartaz: import_zod.z.boolean()
});
var filmeUp = async (request, reply) => {
  try {
    const filme = filmeSchema.parse(request.body);
    const novoFilme = await prisma.filme.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filmeUp
});
