import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

    async function main() {

        const dragQueen = await prisma.dragQueen.create({
            data: {
                name: 'Trixie Mattel',
                season: 7, 
                winner: false, 
                info: 'Não ganhou a temporada, mas ganhou o All Stars 3',
            }

        })    
    }

main()
