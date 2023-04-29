import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const genshinweapon =  await prisma.genshinWeapon.create({
        data: {
        name: 'Amos Bow',
        description: 'This bow was originally wielded by Amos, who used it to hunt boars. It is also the bow she used in her attempt to slay Decarabian. ',
        atk: 46,
        weaponT5: true,
      },

    });

  }

main()
  