import { Controller, Get, Post, Body, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // Coder applies
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CODER, Role.ADMIN)
  @Post()
  apply(@Req() req: Request, @Body() dto: CreateApplicationDto) {
    const user = (req as any).user as { id: string };
    return this.applicationsService.apply(user.id, dto.vacancyId);
  }

  // Gestor lists applications (optionally by vacancy)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.GESTOR, Role.ADMIN)
  @Get()
  list(@Query('vacancyId') vacancyId?: string) {
    return this.applicationsService.list(vacancyId);
  }
}
