import { Controller, Get, Param, Patch, Body, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-api-key',
  description: 'API Key required to access the endpoints',
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // -----------------------------
  // GET /users/me
  // -----------------------------
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
    description:
      'Returns the profile of the currently authenticated user (any role).',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (missing or invalid JWT / API Key)',
  })
  async me(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.usersService.findById(user.id);
  }

  // -----------------------------
  // GET /users
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'List all users',
    description:
      'Returns a list of all users in the system (ADMIN only). Useful for evaluation and audits.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users list retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only ADMIN role allowed)',
  })
  findAll() {
    return this.usersService.findAll();
  }

  // -----------------------------
  // PATCH /users/:id/role
  // -----------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/role')
  @ApiOperation({
    summary: 'Update user role',
    description:
      'Updates the role of a user (ADMIN only). Roles can be ADMIN, GESTOR or CODER.',
  })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    example: 'b1872d11-7fb9-4a44-b522-202c53fffed4',
  })
  @ApiBody({ type: UpdateUserRoleDto })
  @ApiResponse({
    status: 200,
    description: 'User role updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only ADMIN role allowed)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  updateRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto) {
    return this.usersService.updateRole(id, dto.role);
  }
}
