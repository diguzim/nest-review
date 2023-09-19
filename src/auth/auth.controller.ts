import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dto';
import { Public } from '../decorators';
import { AuthenticateUserUseCase } from '../@core/application/auth/authenticate-user.use-case';
import { User } from '../@core/domain/user/user.entity';
import { UserSerializer } from '../common/serializers/user.serializer';

export interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authenticateUserUseCase.execute(signInDto);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return UserSerializer.serialize(req.user);
  }
}
