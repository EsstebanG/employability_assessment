import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Modality } from '../../common/enums/modality.enum';
import { Location } from '../../common/enums/location.enum';

export class CreateVacancyDto {
    @ApiProperty({ example: 'Backend Developer' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(160)
    title: string;

    @ApiProperty({ example: 'NestJS + PostgreSQL project' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'NestJS, PostgreSQL, Docker' })
    @IsString()
    @IsNotEmpty()
    technologies: string;

    @ApiProperty({ example: 'Junior' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    seniority: string;

    @ApiProperty({ example: 'Teamwork, Communication' })
    @IsString()
    @IsNotEmpty()
    softSkills: string;

    @ApiProperty({ enum: Location, example: Location.MEDELLIN })
    @IsEnum(Location)
    location: Location;

    @ApiProperty({ enum: Modality, example: Modality.REMOTE })
    @IsEnum(Modality)
    modality: Modality;

    @ApiProperty({ example: '3M - 5M COP' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    salaryRange: string;

    @ApiProperty({ example: 'Riwi' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    company: string;

    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(1)
    maxApplicants: number;

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
