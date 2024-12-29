import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            name: 'Yana',
            email: 'email@gmail.com',
            password: '123qwe'
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })