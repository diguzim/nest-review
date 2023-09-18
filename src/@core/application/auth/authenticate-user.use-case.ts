import { UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';
import { ICryptService, IJWTService } from '../../services';

export type AuthenticateUserInput = {
  email: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptService: ICryptService,
    private jwtService: IJWTService,
  ) {}

  async execute(input: AuthenticateUserInput) {
    const user = await this.userRepository.findOneBy({ email: input.email });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await this.cryptService.compare(
      input.password,
      user.password_hash,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
