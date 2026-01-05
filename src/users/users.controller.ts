import { Controller, Get, Param, Patch, Body, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { UsersService } from './users.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ JWT test endpoint (any logged-in user)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.usersService.findById(user.id);
  }

  // ✅ ADMIN only: list all users (useful for evaluation)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ✅ ADMIN only: update role (optional but helps demo role control)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto) {
    return this.usersService.updateRole(id, dto.role);
  }
}
