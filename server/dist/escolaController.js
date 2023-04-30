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

// src/escolaController.ts
var escolaController_exports = {};
__export(escolaController_exports, {
  create: () => create,
  listAll: () => listAll
});
module.exports = __toCommonJS(escolaController_exports);

// src/escolaModel.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  listAll
});
