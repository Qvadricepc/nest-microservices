import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: CreateUserInput): Promise<User> {
        const hashedPassword = await hash(data.password, 12);
        
        return this.prisma.user.create({ 
            data: {
                ...data,
                password: hashedPassword,
            }
        });
    }  
    
    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}
