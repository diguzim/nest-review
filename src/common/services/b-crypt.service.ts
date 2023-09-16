import * as bcrypt from 'bcrypt';
import { ICryptService } from '../../@core/services';

export class BCryptService implements ICryptService {
  async hash(plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(plaintext, salt);

    return hash;
  }
}
