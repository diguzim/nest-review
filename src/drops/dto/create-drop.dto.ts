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

  defaultMessage(args: ValidationArguments) {
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

export class CreateDropDto {
  @IsNotEmpty()
  creatureId: number;

  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  @Min(0)
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
