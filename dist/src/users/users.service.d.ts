import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        roles: ({
            role: {
                id: number;
                name: string;
            };
        } & {
            roleId: number;
            userId: number;
        })[];
    } & {
        isActive: boolean;
        id: number;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        roles: ({
            role: {
                id: number;
                name: string;
            };
        } & {
            roleId: number;
            userId: number;
        })[];
    } & {
        isActive: boolean;
        id: number;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
    })[]>;
    findOneWithPermissions(id: number): Promise<{
        id: number;
        email: string;
        roles: string[];
        permissions: string[];
    }>;
    assignRole(userId: number, roleId: number): Promise<{
        roleId: number;
        userId: number;
    }>;
    removeRole(userId: number, roleId: number): Promise<{
        roleId: number;
        userId: number;
    }>;
    removeUser(userId: number): Promise<{
        isActive: boolean;
        id: number;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        isActive: boolean;
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        roles: {
            role: {
                id: number;
                name: string;
            };
        }[];
    }>;
    findAllPaginate(query: UserQueryDto): Promise<{
        data: {
            isActive: boolean;
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            roles: {
                role: {
                    id: number;
                    name: string;
                };
            }[];
        }[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
}
