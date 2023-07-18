import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { AuthGuard } from './auth.guard';
import { Public } from '../decorators';
import { User } from '../users/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    const result = this.authService.signIn(signInDto.email, signInDto.password);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
