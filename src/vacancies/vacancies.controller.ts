import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Vacancies')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-api-key',
  description: 'API Key required to access the endpoints',
})
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  // -----------------------------
  // GET /vacancies
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.GESTOR, Role.CODER)
  @Get()
  @ApiOperation({
    summary: 'List vacancies',
    description:
      'Returns a list of vacancies. Coders can only see active vacancies by default.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    description: 'If true, returns only active vacancies',
    example: 'true',
  })
  @ApiResponse({
    status: 200,
    description: 'Vacancies retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (missing or invalid JWT / API Key)',
  })
  findAll(@Query('activeOnly') activeOnly?: string) {
    const only = activeOnly === 'true' ? true : true;
    return this.vacanciesService.findAll(only);
  }

  // -----------------------------
  // GET /vacancies/:id
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.GESTOR, Role.CODER)
  @Get(':id')
  @ApiOperation({
    summary: 'Get vacancy by ID',
    description: 'Returns the details of a single vacancy',
  })
  @ApiParam({
    name: 'id',
    description: 'Vacancy UUID',
    example: '8b2f7b57-2f27-4c1c-8f4f-6dc41ab3d0c1',
  })
  @ApiResponse({
    status: 200,
    description: 'Vacancy found',
  })
  @ApiResponse({
    status: 404,
    description: 'Vacancy not found',
  })
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(id);
  }

  // -----------------------------
  // POST /vacancies
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.GESTOR)
  @Post()
  @ApiOperation({
    summary: 'Create vacancy',
    description: 'Creates a new vacancy (ADMIN or GESTOR only)',
  })
  @ApiBody({ type: CreateVacancyDto })
  @ApiResponse({
    status: 201,
    description: 'Vacancy created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (role not allowed)',
  })
  create(@Body() dto: CreateVacancyDto) {
    return this.vacanciesService.create(dto);
  }

  // -----------------------------
  // PATCH /vacancies/:id
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.GESTOR)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update vacancy',
    description:
      'Updates vacancy information, including maxApplicants (ADMIN or GESTOR)',
  })
  @ApiParam({
    name: 'id',
    description: 'Vacancy UUID',
  })
  @ApiBody({ type: UpdateVacancyDto })
  @ApiResponse({
    status: 200,
    description: 'Vacancy updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Vacancy not found',
  })
  update(@Param('id') id: string, @Body() dto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, dto);
  }

  // -----------------------------
  // PATCH /vacancies/:id/active
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.GESTOR)
  @Patch(':id/active')
  @ApiOperation({
    summary: 'Activate / deactivate vacancy',
    description:
      'Enables or disables a vacancy so coders can or cannot apply',
  })
  @ApiParam({
    name: 'id',
    description: 'Vacancy UUID',
  })
  @ApiBody({
    schema: {
      example: {
        isActive: false,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Vacancy status updated',
  })
  setActive(@Param('id') id: string, @Body() body: { isActive: boolean }) {
    return this.vacanciesService.toggleActive(id, body.isActive);
  }
}
