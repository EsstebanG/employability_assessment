import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'juan@test.com' })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(180)
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(72)
    password: string;
}
