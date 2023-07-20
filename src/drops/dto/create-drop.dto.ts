import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

@ValidatorConstraint({ name: 'minMaxDrops', async: false })
export class MinMaxDropsValidator implements ValidatorConstraintInterface {
  validate(maxDrops: any, args: ValidationArguments) {
    const { object } = args;
    const minDrops: number = (object as any)['minDrops'];
    return minDrops <= maxDrops;
  }

  defaultMessage(args: ValidationArguments) {
    return `maxDrops must not be smaller than minDrops`;
  }
}

export function MinMaxDrops(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MinMaxDropsValidator,
    });
  };
}

@ValidatorConstraint({ name: 'minAccordingToDropRate', async: false })
export class MinAccordingToDropRateValidator
  implements ValidatorConstraintInterface
{
  validate(minDrops: any, args: ValidationArguments) {
    const { object } = args;
    const dropChance: number = (object as any)['dropChance'];
    if (dropChance == 100) {
      return minDrops >= 1;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `minDrops must be at least 1 if dropChance is 100`;
  }
}

export function MinAccordingToDropRate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MinAccordingToDropRateValidator,
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
  @Max(100)
  dropChance: number;

  @IsNotEmpty()
  @Min(0)
  @MinAccordingToDropRate()
  minDrops: number;

  @IsNotEmpty()
  @MinMaxDrops()
  maxDrops: number;
}
