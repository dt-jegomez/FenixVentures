import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async onModuleInit() {
        await this.createAdminUser();
    }

    async createAdminUser() {
        const adminUser = await this.findOne('admin');
        if (!adminUser) {
            await this.create('admin', '1234');
            console.log('Admin user created');
        }
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async create(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ username, password: hashedPassword });
        return this.usersRepository.save(user);
    }
}