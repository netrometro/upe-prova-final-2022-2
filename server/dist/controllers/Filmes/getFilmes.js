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

// src/controllers/Filmes/getFilmes.ts
var getFilmes_exports = {};
__export(getFilmes_exports, {
  buscarFilmes: () => buscarFilmes,
  default: () => getFilmes_default
});
module.exports = __toCommonJS(getFilmes_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var buscarFilmes = async (request, reply) => {
  try {
    const filmes = await prisma.filme.findMany();
    console.log("lista de filmes", filmes);
    reply.status(200).send({ success: true, data: filmes, message: "Lista de filmes" });
  } catch (error) {
    console.error("Erro na busca de filmes", error);
    reply.status(500).send({ success: false, message: "Erro ao buscar filmes" });
  }
};
var getFilmes_default = buscarFilmes;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buscarFilmes
});
