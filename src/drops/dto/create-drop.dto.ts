import { IsNotEmpty, Min, Max, IsInt } from 'class-validator';
import { IsNonNegative } from '../../common/validators';
import { GreaterThanOrEqualToMinDrops } from './GreaterThanOrEqualToMinDrops';

export class CreateDropDto {
  @IsNotEmpty()
  creatureId: number;

  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  @IsNonNegative()
  @Max(1)
  dropRate: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  minDrops: number;

  @IsNotEmpty()
  @IsInt()
  @GreaterThanOrEqualToMinDrops()
  maxDrops: number;
}
