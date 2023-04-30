import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarEscola = async (data: any) => {
    const escola = await prisma.escola.create({data})
    return escola
}

export const listarEscolas = async () => {
    const escola = await prisma.escola.findMany()
    return escola
}