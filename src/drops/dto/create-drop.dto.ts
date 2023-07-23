import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  IsNotEmpty,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { IsNonNegative } from '../../common/validators';

@ValidatorConstraint({ name: 'greaterThanOrEqualToMinValidator', async: false })
export class GreaterThanOrEqualToMinValidator
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const { object } = args;
    const minDrops: number = (object as any)['minDrops'];
    return value >= minDrops;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be greater than or equal to minDrops`;
  }
}

export function GreaterThanOrEqualToMin(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: GreaterThanOrEqualToMinValidator,
    });
  };
}

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
  @GreaterThanOrEqualToMin()
  maxDrops: number;
}
