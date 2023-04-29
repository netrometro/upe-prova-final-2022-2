import { Animal } from "@prisma/client";
import prismaClient from "../../prisma";


interface AnimalDTO {
    nome: string;
    especie: string;
    idade: number;
    vacinado: boolean;
}

  

export class CriarAnimaisServices {
    async execute({nome, especie, idade, vacinado}: AnimalDTO): Promise<Animal> {
            const product = await prismaClient.animal.create({
                data: {
                    nome,
                    especie,
                    idade,
                    vacinado,
                }
            });
    
            return product;

    }
}