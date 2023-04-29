import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

    async function main() {

        const dragQueen = await prisma.dragQueen.upsert({
            where: {
                id: 1
            },

            update: {
                name: 'Trixie Mattel',
                season: 7, 
                winner: false, 
                info: 'Não ganhou a temporada, mas ganhou o All Stars 3',
            },
            
            create: {
                name: 'Trixie Mattel',
                season: 7, 
                winner: false, 
                info: 'Ficou em 6º lugar na temporada 7, mas ganhou o All Stars 3',
                }

        })    
    }

main()
