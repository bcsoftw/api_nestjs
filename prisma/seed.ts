import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const permissionData = [
  { name: 'CREATE_USER' },
  { name: 'READ_USER' },
  { name: 'READ_USER_PROFILE' },
  { name: 'UPDATE_USER' },
  { name: 'DELETE_USER' },
  { name: 'ASSIGN_ROLE' },
  { name: 'REMOVE_ROLE' },
  { name: 'CREATE_ROLE' },
  { name: 'READ_ROLE' },
  { name: 'DELETE_ROLE' },
  { name: 'UPDATE_ROLE' },
];

async function main() {
  console.log('Start seeding ...');

  // 1 Limpieza previa (orden importa por FKs; onDelete: Cascade ayuda igual)
  await prisma.refreshToken.deleteMany({});
  await prisma.userRole.deleteMany({});
  await prisma.rolePermission.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.permission.deleteMany({});
  console.log('Datos previos limpiados.');

  // 2. Crear permisos
  const permissions = await Promise.all(
    permissionData.map((p) => prisma.permission.create({ data: p })),
  );
  console.log(`Permisos creados: ${permissions.map((p) => p.name).join(', ')}`);

  const findPermission = (name: string) => {
    const permission = permissions.find((p) => p.name === name);
    if (!permission) throw new Error(`Permission ${name} not found`);
    return permission;
  };

  // 3. Crear roles y asociar permisos vía RolePermission
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      permissions: {
        create: permissions.map((p) => ({ permissionId: p.id })),
      },
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
      permissions: {
        create: [{ permissionId: findPermission('READ_USER').id }],
      },
    },
  });
  console.log('Roles creados: ADMIN, USER');

  // 4. Crear usuarios con contraseña encriptada y asociar roles vía UserRole
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: 'Administrador Global',
      password: hashedPassword,
      isActive: true,
      roles: {
        create: [{ roleId: adminRole.id }],
      },
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@user.com',
      name: 'Juan Pérez',
      password: hashedPassword,
      isActive: true,
      roles: {
        create: [{ roleId: userRole.id }],
      },
    },
  });
  console.log(`Usuarios creados: ${adminUser.email}, ${regularUser.email}`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
