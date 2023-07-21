import { validate } from 'class-validator';
import { CreateDropDto } from './create-drop.dto';

describe('CreateDropDto', () => {
  it("should validate all fields that can't be null", async () => {
    const dto = new CreateDropDto();

    const errors = await validate(dto);
    expect(errors.length).toBe(5);
  });

  describe('when all fields are defined', () => {
    describe('when dropRate is negative', () => {
      it('should return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = -1;
        dto.minDrops = 1;
        dto.maxDrops = 2;

        const errors = await validate(dto);

        expect(errors.length).toBe(1);
        expect(errors[0].constraints).toEqual({
          isNonNegativeValidator: 'dropRate must be greater than or equal to 0',
        });
      });
    });

    describe('when drop rate is zero', () => {
      it('should not return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 0;
        dto.minDrops = 1;
        dto.maxDrops = 2;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
      });
    });

    describe('when drop rate is between 0 and 1', () => {
      it('should not return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 0.5;
        dto.minDrops = 1;
        dto.maxDrops = 2;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
      });
    });

    describe('when drop rate is 1', () => {
      it('should not return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 1;
        dto.minDrops = 1;
        dto.maxDrops = 2;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
      });
    });

    describe('when dropRate is greater than 1', () => {
      it('should return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 2;
        dto.minDrops = 1;
        dto.maxDrops = 2;

        const errors = await validate(dto);

        expect(errors.length).toBe(1);
        expect(errors[0].constraints).toEqual({
          max: 'dropRate must not be greater than 1',
        });
      });
    });

    describe('when min Drops is zero', () => {
      it('should return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 1;
        dto.minDrops = 0;
        dto.maxDrops = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(1);
      });
    });

    describe('when min Drops is not an integer', () => {
      it('should return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 1;
        dto.minDrops = 1.5;
        dto.maxDrops = 2;

        const errors = await validate(dto);

        expect(errors.length).toBe(1);
        expect(errors[0].constraints).toEqual({
          isInt: 'minDrops must be an integer number',
        });
      });
    });

    describe('when minDrops is greater than maxDrops', () => {
      it('should return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 1;
        dto.minDrops = 2;
        dto.maxDrops = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(1);
        expect(errors[0].constraints).toEqual({
          greaterThanOrEqualToMinValidator:
            'maxDrops must be greater than or equal to minDrops',
        });
      });
    });

    describe('when minDrops is equal to maxDrops', () => {
      it('should not return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropRate = 1;
        dto.minDrops = 1;
        dto.maxDrops = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
      });
    });
  });
});
