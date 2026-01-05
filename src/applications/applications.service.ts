import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from './entities/application.entity';
import { Vacancy } from '../vacancies/entities/vacancy.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application) private readonly appRepo: Repository<Application>,
    @InjectRepository(Vacancy) private readonly vacancyRepo: Repository<Vacancy>,
  ) {}

  async apply(userId: string, vacancyId: string) {
    const vacancy = await this.vacancyRepo.findOne({ where: { id: vacancyId } });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    if (!vacancy.isActive) throw new BadRequestException('Vacancy is inactive');

    // Rule 1: cannot apply twice
    const already = await this.appRepo.findOne({
      where: { user: { id: userId }, vacancy: { id: vacancyId } },
      relations: { user: true, vacancy: true },
    });
    if (already) throw new ConflictException('You already applied to this vacancy');

    // Rule 2: no applications if cup full
    const totalApps = await this.appRepo.count({
      where: { vacancy: { id: vacancyId } },
    });
    if (totalApps >= vacancy.maxApplicants) {
      throw new BadRequestException('Vacancy is full');
    }

    // Rule 3: max 3 active applications (to active vacancies)
    const activeApps = await this.appRepo
      .createQueryBuilder('a')
      .innerJoin('a.vacancy', 'v')
      .where('a.userId = :userId', { userId })
      .andWhere('v.isActive = true')
      .getCount();

    if (activeApps >= 3) {
      throw new BadRequestException('You cannot apply to more than 3 active vacancies');
    }

    const application = this.appRepo.create({
      user: { id: userId } as User,
      vacancy: { id: vacancyId } as Vacancy,
    });

    return this.appRepo.save(application);
  }

  async list(vacancyId?: string) {
    const where = vacancyId ? { vacancy: { id: vacancyId } } : {};
    return this.appRepo.find({
      where,
      relations: { user: true, vacancy: true },
      order: { appliedAt: 'DESC' },
    });
  }
}
