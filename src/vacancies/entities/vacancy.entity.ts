import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

import { Modality } from '../../common/enums/modality.enum';
import { Location } from 'src/common/enums/location.enum';

@Entity({ name: 'vacancies' })
export class Vacancy extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 160 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    technologies: string;

    @Column({ type: 'varchar', length: 60 })
    seniority: string;

    @Column({ type: 'text' })
    softSkills: string;

    @Column({ type: 'enum', enum: Location })
    location: Location;

    @Column({ type: 'enum', enum: Modality })
    modality: Modality;

    @Column({ type: 'varchar', length: 80 })
    salaryRange: string;

    @Column({ type: 'varchar', length: 120 })
    company: string;

    @Column({ type: 'int' })
    maxApplicants: number;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
}
