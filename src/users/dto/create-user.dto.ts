import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
