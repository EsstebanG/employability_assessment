import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(180)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(72)
    password: string;

    @IsEnum(Role)
    role: Role;
}
