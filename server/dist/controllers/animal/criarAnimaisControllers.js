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

// src/controllers/animal/criarAnimaisControllers.ts
var criarAnimaisControllers_exports = {};
__export(criarAnimaisControllers_exports, {
  CriarAnimaisController: () => CriarAnimaisController
});
module.exports = __toCommonJS(criarAnimaisControllers_exports);

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

// src/controllers/animal/criarAnimaisControllers.ts
var CriarAnimaisController = class {
  async handle(req, res) {
    try {
      const { nome, especie, idade, vacinado } = req.body;
      const criarAnimaisServices = new CriarAnimaisServices();
      const result = await criarAnimaisServices.execute({ nome, especie, idade, vacinado });
      return res.status(201).send(result);
    } catch (err) {
      console.log(err);
      res.status(404).send({ error: err });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarAnimaisController
});
