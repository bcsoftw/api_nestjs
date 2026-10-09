import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ChangePasswordDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registers a new user.',
    description: 'This route is public and does not requiere authentication',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already existed.',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login a user.',
    description: 'This route is public and does not requiere authentication',
  })
  @ApiResponse({
    status: 201,
    description: 'User logged in successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // Protected route test endpoint
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOperation({
    summary: 'Get the profile of the logged-in user.',
    description: 'This route is protected and requires a valid JWT to access.',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  getProfile(@Req() req: any) {
    return req.user;
  }


  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  @ApiOperation({
    summary: 'Change the user password.',
    description: 'This route is protected and requires a valid JWT to access.',
  })
  @ApiResponse({
    status: 201,
    description: 'Password changed successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async changePassword(
    @Req() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    // req.user viene inyectado por el JwtAuthGuard tras validar el token
    const userId = req.user.id;
    const { currentPassword, newPassword } = changePasswordDto;

    return this.authService.changePassword(
      userId,
      currentPassword,
      newPassword,
    );
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh token.',
    description: 'This route is protected and requires a valid JWT to access.',
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @ApiOperation({
    summary: 'Logout a user.',
    description: 'This route is protected and requires a valid JWT to access.',
  })
  @ApiResponse({
    status: 201,
    description: 'User logged out successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.logout(refreshTokenDto);
  }
}
