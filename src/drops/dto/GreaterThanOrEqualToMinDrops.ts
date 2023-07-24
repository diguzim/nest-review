import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'greaterThanOrEqualToMinValidator', async: false })
export class GreaterThanOrEqualToMinDropsValidator
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

export function GreaterThanOrEqualToMinDrops(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: GreaterThanOrEqualToMinDropsValidator,
    });
  };
}
