export declare class BaseUserDto {
    email: string;
    password: string;
    name: string;
    roleIds?: number[];
    isActive?: boolean;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto extends BaseUserDto {
}
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    roleIds?: number[];
    isActive?: boolean;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
