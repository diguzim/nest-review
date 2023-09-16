export interface ICryptService {
  hash(plaintext: string): Promise<string>;
}
