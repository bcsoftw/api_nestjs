import { CreateUserDto } from './dto/create-user.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        roles: ({
            role: {
                name: string;
                id: number;
            };
        } & {
            roleId: number;
            userId: number;
        })[];
    } & {
        email: string;
        password: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        id: number;
    }>;
    getAllUsers(): Promise<({
        roles: ({
            role: {
                name: string;
                id: number;
            };
        } & {
            roleId: number;
            userId: number;
        })[];
    } & {
        email: string;
        password: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        id: number;
    })[]>;
    getUserProfile(id: number): Promise<{
        id: number;
        email: string;
        roles: string[];
        permissions: string[];
    }>;
    assignRole(userId: number, assignRoleDto: AssignRoleDto): Promise<{
        roleId: number;
        userId: number;
    }>;
    removeRole(userId: number, roleId: number): Promise<{
        roleId: number;
        userId: number;
    }>;
    removeUser(userId: number): Promise<{
        email: string;
        password: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        id: number;
    }>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        roles: {
            role: {
                name: string;
                id: number;
            };
        }[];
        id: number;
    }>;
    findAll(query: UserQueryDto): Promise<{
        data: {
            email: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            roles: {
                role: {
                    name: string;
                    id: number;
                };
            }[];
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
