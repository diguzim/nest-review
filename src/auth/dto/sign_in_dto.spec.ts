import { SignInDto } from './sign_in_dto';
import { validate } from 'class-validator';

describe('SignInDto', () => {
  it('should be defined', () => {
    expect(new SignInDto()).toBeDefined();
  });

  it("should validate that email is not empty and it's an email", () => {
    const dto = new SignInDto();
    dto.email = '';
    dto.password = '12345678';

    validate(dto).then((errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: 'email should not be empty',
        isEmail: 'email must be an email',
      });
    });
  });

  it('should validate that password is not empty', () => {
    const dto = new SignInDto();
    dto.email = 'email@example.com';
    dto.password = '';

    validate(dto).then((errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: 'password should not be empty',
      });
    });
  });
});
