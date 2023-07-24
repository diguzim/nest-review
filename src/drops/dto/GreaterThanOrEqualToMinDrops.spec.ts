import { validate } from 'class-validator';
import { GreaterThanOrEqualToMinDrops } from './GreaterThanOrEqualToMinDrops';
import { plainToInstance } from 'class-transformer';

describe('GreaterThanOrEqualToMinDropsDecorator', () => {
  class TestDTO {
    minDrops: number;

    @GreaterThanOrEqualToMinDrops()
    maxDrops: number;
  }

  it('should assert for no errors when maxDrops is greater than minDrops', async () => {
    const minDrops = 1;
    const maxDrops = 2;

    const dto = plainToInstance(TestDTO, {
      minDrops,
      maxDrops,
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should assert for no errors with equal values', async () => {
    const minDrops = 1;
    const maxDrops = 1;

    const dto = plainToInstance(TestDTO, {
      minDrops,
      maxDrops,
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should assert for errors with maxDrops less than minDrops', async () => {
    const minDrops = 2;
    const maxDrops = 1;

    const dto = plainToInstance(TestDTO, {
      minDrops,
      maxDrops,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      greaterThanOrEqualToMinValidator:
        'maxDrops must be greater than or equal to minDrops',
    });
  });
});
