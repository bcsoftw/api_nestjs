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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (userExists)
            throw new common_1.ConflictException('Email already registered');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name,
                roles: {
                    create: dto.roleIds?.map((id) => ({ roleId: id })) || [],
                },
            },
        });
        return this.signToken(user.id, user.email, user.name);
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('La cuenta de usuario está desactivada.');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return this.signToken(user.id, user.email, user.name);
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('La contraseña actual es incorrecta');
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new common_1.BadRequestException('La nueva contraseña no puede ser igual a la anterior');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
            },
        });
        return {
            message: 'Contraseña actualizada exitosamente. Por favor, inicia sesión de nuevo.',
        };
    }
    async logout(dto) {
        try {
            await this.prisma.refreshToken.delete({
                where: { token: dto.refreshToken },
            });
            return { message: 'Sesión cerrada exitosamente.' };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido o ya sesión cerrada.');
        }
    }
    async refreshToken(dto) {
        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { token: dto.refreshToken },
            include: {
                user: {
                    include: { roles: true },
                },
            },
        });
        if (!storedToken) {
            throw new common_1.UnauthorizedException('Token no válido.');
        }
        if (storedToken.isRevoked) {
            throw new common_1.UnauthorizedException('Token revocado.');
        }
        if (new Date() > storedToken.expiresAt) {
            await this.prisma.refreshToken
                .delete({ where: { token: dto.refreshToken } })
                .catch(() => { });
            throw new common_1.UnauthorizedException('Token expirado.');
        }
        if (!storedToken.user.isActive) {
            throw new common_1.UnauthorizedException('El usuario está inactivo.');
        }
        const payload = {
            sub: storedToken.user.id,
            email: storedToken.user.email,
            name: storedToken.user.name,
        };
        const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const newRefreshTokenString = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });
        const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.prisma.$transaction([
            this.prisma.refreshToken.delete({
                where: { token: dto.refreshToken },
            }),
            this.prisma.refreshToken.create({
                data: {
                    token: newRefreshTokenString,
                    userId: storedToken.userId,
                    expiresAt: newExpiresAt,
                },
            }),
        ]);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshTokenString,
        };
    }
    async signToken(userId, email, name) {
        const payload = { sub: userId, email, name };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshTokenString = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.prisma.refreshToken.create({
            data: {
                token: refreshTokenString,
                userId: userId,
                expiresAt,
            },
        });
        return {
            user: { id: userId, email: email, name: name },
            accessToken,
            refreshToken: refreshTokenString,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map