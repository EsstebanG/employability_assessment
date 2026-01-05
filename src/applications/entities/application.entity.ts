import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { User } from '../../users/entities/user.entity';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

@Entity({ name: 'applications' })
@Unique(['user', 'vacancy'])
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Vacancy, { nullable: false, onDelete: 'CASCADE' })
    vacancy: Vacancy;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    appliedAt: Date;
}
