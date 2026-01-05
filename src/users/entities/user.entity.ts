import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// ENUM.
import { Role } from '../../common/enums/role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidad base. / Base entity.
import { BaseEntity } from '../../shared/base.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 120 })
    name: string;

    @Column({ type: 'varchar', length: 180 })
    email: string;

    @Column({ type: 'varchar', length: 255, select: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.CODER })
    role: Role;

}
