import { IsOptional, IsUUID } from 'class-validator';

export class ListApplicationsQueryDto {
    @IsOptional()
    @IsUUID()
    vacancyId?: string;

    @IsOptional()
    @IsUUID()
    userId?: string;
}
