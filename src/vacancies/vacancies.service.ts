import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy) private readonly vacancyRepo: Repository<Vacancy>,
  ) {}

  async create(dto: CreateVacancyDto) {
    const vacancy = this.vacancyRepo.create(dto);
    return this.vacancyRepo.save(vacancy);
  }

  async findAll(activeOnly?: boolean) {
    const where = activeOnly ? { isActive: true } : {};
    return this.vacancyRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const v = await this.vacancyRepo.findOne({ where: { id } });
    if (!v) throw new NotFoundException('Vacancy not found');
    return v;
  }

  async update(id: string, dto: UpdateVacancyDto) {
    const v = await this.findOne(id);
    Object.assign(v, dto);
    return this.vacancyRepo.save(v);
  }

  async toggleActive(id: string, isActive: boolean) {
    return this.update(id, { isActive });
  }
}
