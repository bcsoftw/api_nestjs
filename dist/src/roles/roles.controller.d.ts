import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
    createPermission(createPermissionDto: CreatePermissionDto): Promise<{
        name: string;
        id: number;
    }>;
    assignPermission(roleId: number, assignPermissionDto: AssignPermissionDto): Promise<{
        permissionId: number;
        roleId: number;
    }>;
    getRoles(): Promise<({
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
    updateRole(roleId: number, updateRoleDto: UpdateRoleDto): Promise<{
        permissions: {
            permissionId: number;
            roleId: number;
        }[];
    } & {
        name: string;
        id: number;
    }>;
}
