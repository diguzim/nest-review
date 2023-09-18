import { JWTService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';

describe('JWTService', () => {
  let dependencyService: JwtService;
  let service: JWTService;

  beforeEach(async () => {
    dependencyService = new JwtService({
      secret: 'secret',
      global: true,
      signOptions: { expiresIn: '24h' },
    });

    service = new JWTService(dependencyService);
  });

  describe('signAsync', () => {
    it('should return a string', async () => {
      const payload = { sub: '123', email: 'email@example.com' };
      const result = await service.signAsync(payload);
      expect(typeof result).toBe('string');
    });
  });

  describe('verifyAsync', () => {
    it('should return a string', async () => {
      const payload = { sub: '123', email: 'email@example.com' };
      const token = await service.signAsync(payload);
      const result = await service.verifyAsync(token);
      expect(typeof result).toBe('object');
    });
  });
});
