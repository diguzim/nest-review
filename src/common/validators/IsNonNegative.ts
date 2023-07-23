import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNonNegativeValidator', async: false })
export class IsNonNegativeValidator implements ValidatorConstraintInterface {
  validate(dropRate: any) {
    return dropRate >= 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be greater than or equal to 0`;
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
