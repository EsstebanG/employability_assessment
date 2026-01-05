import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepo: Repository<User>,
    ) {}

    async findByEmailWithPassword(email: string) {
        return this.usersRepo
        .createQueryBuilder('u')
        .addSelect('u.password')
        .where('u.email = :email', { email })
        .getOne();
    }

    async findById(id: string) {
        return this.usersRepo.findOne({ where: { id } });
    }

    async createCoder(params: { name: string; email: string; password: string }) {
        const user = this.usersRepo.create(params);
        return this.usersRepo.save(user);
    }

    async findAll() {
        return this.usersRepo.find({
            order: { createdAt: 'DESC' },
        });
    }

    async updateRole(id: string, role: Role) {
        const user = await this.findById(id);
        if (!user) throw new NotFoundException('User not found');

        user.role = role;
        return this.usersRepo.save(user);
    }
}
