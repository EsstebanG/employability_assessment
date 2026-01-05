import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth') 
@Public() 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new coder',
    description: 'Registers a new user with CODER role by default',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'User registration payload',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        success: true,
        data: {
          accessToken: 'jwt.token.here',
          tokenType: 'Bearer',
        },
        message: 'Operación exitosa',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Email already registered',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticates a user and returns a JWT token',
  })
  @ApiBody({
    type: LoginDto,
    description: 'User login payload',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        success: true,
        data: {
          accessToken: 'jwt.token.here',
          tokenType: 'Bearer',
        },
        message: 'Operación exitosa',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
