import { PrismaService } from '../prisma/prisma.service';
export declare class DatabaseService {
    private prisma;
    constructor(prisma: PrismaService);
    cleanDatabase(): Promise<void>;
}
