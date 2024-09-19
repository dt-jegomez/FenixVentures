import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        validateUser: jest.fn(),
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should return JWT token when credentials are valid', async () => {
            const loginDto = { username: 'testuser', password: 'testpass' };
            const user = { id: 1, username: 'testuser' };
            const token = { access_token: 'test-token' };

            (authService.validateUser as jest.Mock).mockResolvedValue(user);
            (authService.login as jest.Mock).mockResolvedValue(token);

            const result = await controller.login(loginDto);
            expect(result).toEqual(token);
        });

        it('should throw UnauthorizedException when credentials are invalid', async () => {
            const loginDto = { username: 'testuser', password: 'wrongpass' };

            (authService.validateUser as jest.Mock).mockResolvedValue(null);

            await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });
    });
});