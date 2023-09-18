import { JwtService } from '@nestjs/jwt';
import { IJWTService } from '../../@core/services';

export class JWTService implements IJWTService {
  constructor(private dependencyService: JwtService) {}

  async signAsync(payload: any) {
    return await this.dependencyService.signAsync(payload);
  }

  async verifyAsync(token: string) {
    return await this.dependencyService.verifyAsync(token);
  }
}
