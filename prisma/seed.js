import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      ci: '12345678',
      matricula: '20210001',
      nombre: 'Juan Perez',
      encuesta_completada: false,
      password: 'password123',
    },
    {
      ci: '87654321',
      matricula: '20210002',
      nombre: 'Maria Gomez',
      encuesta_completada: true,
      password: 'password456',
    },
    {
      ci: '11223344',
      matricula: '20210003',
      nombre: 'Carlos Sanchez',
      encuesta_completada: false,
      password: 'password789',
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });