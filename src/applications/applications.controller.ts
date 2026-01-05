import { Controller, Get, Post, Body, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiOperation, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Applications')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-api-key',
  description: 'API Key required to access the endpoints',
})
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // -----------------------------
  // POST /applications
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CODER, Role.ADMIN)
  @Post()
  @ApiOperation({
    summary: 'Apply to a vacancy',
    description:
      'Creates an application for the authenticated coder. Enforces business rules: ' +
      '(1) cannot apply twice to the same vacancy, ' +
      '(2) cannot apply if vacancy is full, ' +
      '(3) cannot have more than 3 active applications.',
  })
  @ApiBody({ type: CreateApplicationDto })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Validation error (invalid vacancyId, etc.)',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (missing/invalid JWT or API Key)',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (role not allowed)',
  })
  @ApiResponse({
    status: 404,
    description: 'Vacancy not found',
  })
  @ApiResponse({
    status: 409,
    description:
      'Business rule violation (already applied / vacancy full / max 3 active applications)',
  })
  apply(@Req() req: Request, @Body() dto: CreateApplicationDto) {
    const user = (req as any).user as { id: string };
    return this.applicationsService.apply(user.id, dto.vacancyId);
  }

  // -----------------------------
  // GET /applications?vacancyId=
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.GESTOR, Role.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'List applications',
    description:
      'Lists applications for the employability team (GESTOR/ADMIN). ' +
      'Optionally filter by vacancyId.',
  })
  @ApiQuery({
    name: 'vacancyId',
    required: false,
    description: 'Filter applications by vacancy UUID',
    example: '8b2f7b57-2f27-4c1c-8f4f-6dc41ab3d0c1',
  })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (missing/invalid JWT or API Key)',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (role not allowed)',
  })
  list(@Query('vacancyId') vacancyId?: string) {
    return this.applicationsService.list(vacancyId);
  }
}
