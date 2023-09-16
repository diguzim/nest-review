import { BCryptService } from './b-crypt.service';

describe('BCryptService', () => {
  let service: BCryptService;

  beforeEach(async () => {
    service = new BCryptService();
  });

  describe('hash', () => {
    it('should hash the plaintext', async () => {
      const plaintext = 'plaintext';

      const hash = await service.hash(plaintext);

      expect(hash).not.toEqual(plaintext);
    });
  });
});
