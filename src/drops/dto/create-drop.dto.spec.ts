import { validate } from 'class-validator';
import { CreateDropDto } from './create-drop.dto';

describe('CreateDropDto', () => {
  it('should validate that all fields are defined', async () => {
    const dto = new CreateDropDto();

    const errors = await validate(dto);
    expect(errors.length).toBe(5);
  });

  describe('when all fields are defined', () => {
    describe('when drop chance is not one hundred', () => {
      it('should not demand that min is at least one', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropChance = 99;
        dto.minDrops = 0;
        dto.maxDrops = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
      });
    });

    describe('when drop chance is one hundred', () => {
      it('should return error when minDrops is zero', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropChance = 100;
        dto.minDrops = 0;
        dto.maxDrops = 1;

        const errors = await validate(dto);
        console.log('errors', errors);

        expect(errors.length).toBe(1);
        expect(errors[0].constraints).toEqual({
          minAccordingToDropRate:
            'minDrops must be at least 1 if dropChance is 100',
        });
      });

      it('should not return error when minDrops is at least one', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropChance = 100;
        dto.minDrops = 1;
        dto.maxDrops = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
      });
    });

    describe('when minDrops is greater than maxDrops', () => {
      it('should return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropChance = 100;
        dto.minDrops = 2;
        dto.maxDrops = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(1);
        expect(errors[0].constraints).toEqual({
          minMaxDrops: 'maxDrops must not be smaller than minDrops',
        });
      });
    });

    describe('when minDrops is equal to maxDrops', () => {
      it('should not return error', async () => {
        const dto = new CreateDropDto();

        dto.itemId = 1;
        dto.creatureId = 1;
        dto.dropChance = 100;
        dto.minDrops = 1;
        dto.maxDrops = 1;

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
      });
    });
  });
});
