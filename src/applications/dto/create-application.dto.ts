import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
    @ApiProperty({ example: '8b2f7b57-2f27-4c1c-8f4f-6dc41ab3d0c1' })
    @IsUUID()
    @IsNotEmpty()
    vacancyId: string;
}
