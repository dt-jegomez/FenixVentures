import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return a user object when credentials are valid', async () => {
            const user = { id: 1, username: 'testuser', password: await bcrypt.hash('testpass', 10) };
            (usersService.findOne as jest.Mock).mockResolvedValue(user);

            const result = await service.validateUser('testuser', 'testpass');
            expect(result).toEqual({ id: 1, username: 'testuser' });
        });

        it('should return null when credentials are invalid', async () => {
            (usersService.findOne as jest.Mock).mockResolvedValue(null);

            const result = await service.validateUser('testuser', 'wrongpass');
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return JWT object when credentials are valid', async () => {
            const user = { id: 1, username: 'testuser' };
            (jwtService.sign as jest.Mock).mockReturnValue('test-token');

            const result = await service.login(user);
            expect(result).toEqual({ access_token: 'test-token' });
        });
    });
});