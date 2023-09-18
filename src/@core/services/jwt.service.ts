export interface IJWTService {
  signAsync(payload: any): Promise<string>;
  verifyAsync(token: string): Promise<any>;
}
