import { IsNotEmpty } from 'class-validator';

export class CreateCreatureDto {
  @IsNotEmpty()
  name: string;
}
