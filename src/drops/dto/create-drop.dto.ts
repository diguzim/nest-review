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

@ValidatorConstraint({ name: 'greaterThanOrEqualToMinValidator', async: false })
export class GreaterThanOrEqualToMinValidator
  implements ValidatorConstraintInterface
{
  validate(maxDrops: any, args: ValidationArguments) {
    const { object } = args;
    const minDrops: number = (object as any)['minDrops'];
    return maxDrops >= minDrops;
  }

  defaultMessage() {
    return 'maxDrops must be greater than or equal to minDrops';
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

@ValidatorConstraint({ name: 'isNonNegativeValidator', async: false })
export class IsNonNegativeValidator implements ValidatorConstraintInterface {
  validate(dropRate: any) {
    return dropRate >= 0;
  }

  defaultMessage() {
    return 'dropRate must be greater than or equal to 0';
  }
}

export function IsNonNegative(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNonNegativeValidator,
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
