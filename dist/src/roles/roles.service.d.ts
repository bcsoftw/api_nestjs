import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    createRole(dto: CreateRoleDto): Promise<{
        permissions: ({
            permission: {
                name: string;
                id: number;
            };
        } & {
            permissionId: number;
            roleId: number;
        })[];
    } & {
        name: string;
        id: number;
    }>;
    createPermission(name: string): Promise<{
        name: string;
        id: number;
    }>;
    assignPermissionToRole(roleId: number, permissionId: number): Promise<{
        permissionId: number;
        roleId: number;
    }>;
    findAllRoles(): Promise<({
        permissions: ({
            permission: {
                name: string;
                id: number;
            };
        } & {
            permissionId: number;
            roleId: number;
        })[];
    } & {
        name: string;
        id: number;
    })[]>;
    getRole(roleId: number): Promise<({
        permissions: ({
            permission: {
                name: string;
                id: number;
            };
        } & {
            permissionId: number;
            roleId: number;
        })[];
    } & {
        name: string;
        id: number;
    }) | null>;
    removeRole(roleId: number): Promise<{
        name: string;
        id: number;
    }>;
    updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<{
        permissions: {
            permissionId: number;
            roleId: number;
        }[];
    } & {
        name: string;
        id: number;
    }>;
    findAllPaginate(query: RoleQueryDto): Promise<{
        data: {
            name: string;
            id: number;
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
