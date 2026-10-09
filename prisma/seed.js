"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_js_1 = require("../src/generated/prisma/client.js");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcrypt"));
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_js_1.PrismaClient({ adapter });
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
    await prisma.refreshToken.deleteMany({});
    await prisma.userRole.deleteMany({});
    await prisma.rolePermission.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.permission.deleteMany({});
    console.log('Datos previos limpiados.');
    const permissions = await Promise.all(permissionData.map((p) => prisma.permission.create({ data: p })));
    console.log(`Permisos creados: ${permissions.map((p) => p.name).join(', ')}`);
    const findPermission = (name) => {
        const permission = permissions.find((p) => p.name === name);
        if (!permission)
            throw new Error(`Permission ${name} not found`);
        return permission;
    };
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
//# sourceMappingURL=seed.js.map