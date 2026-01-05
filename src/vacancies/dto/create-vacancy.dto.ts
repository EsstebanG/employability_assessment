import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, } from 'class-validator';

import { Modality } from '../../common/enums/modality.enum';
import { Location } from '../../common/enums/location.enum';

export class CreateVacancyDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(160)
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    technologies: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    seniority: string;

    @IsString()
    @IsNotEmpty()
    softSkills: string;

    @IsEnum(Location)
    location: Location;

    @IsEnum(Modality)
    modality: Modality;

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    salaryRange: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    company: string;

    @IsInt()
    @Min(1)
    maxApplicants: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
