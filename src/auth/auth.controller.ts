import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Return JWT access token',
        type: JwtResponseDto
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Body() loginDto: LoginDto): Promise<JwtResponseDto> {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}