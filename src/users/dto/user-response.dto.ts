import { Role } from '../../common/enums/role.enum';

export class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
}
