import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsString } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'Juan Esteban', description: 'Full name of the coder' })
    @IsNotEmpty()
    @MaxLength(120)
    name: string;

    @ApiProperty({ example: 'juan@test.com', description: 'Unique email' })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(180)
    email: string;

    @ApiProperty({ example: '123456', description: 'Password (min 6 chars)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(72)
    password: string;
}
