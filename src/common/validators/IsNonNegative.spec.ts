import { validate } from 'class-validator';
import { IsNonNegative } from './IsNonNegative';
import { plainToInstance } from 'class-transformer';

describe('IsNonNegativeDecorator', () => {
  it('should assert for no errors with zero', async () => {
    const validValue = 0;
    class TestDTO {
      @IsNonNegative()
      dropRate: number;
    }
    const dto = new TestDTO();
    dto.dropRate = validValue;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should assert for no errors with positive value', async () => {
    const validValue = 5;
    class TestDTO {
      @IsNonNegative()
      dropRate: number;
    }
    const dto = new TestDTO();
    dto.dropRate = validValue;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should assert for errors with a negative value', async () => {
    const invalidValue = -5;
    class TestDTO {
      @IsNonNegative()
      value: number;
    }

    const myDtoObject = plainToInstance(TestDTO, {
      value: invalidValue,
    });

    const errors = await validate(myDtoObject, { skipMissingProperties: true });

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isNonNegativeValidator: 'value must be greater than or equal to 0',
    });
  });
});
