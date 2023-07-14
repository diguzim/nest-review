import { IsNotEmpty } from 'class-validator';

export class UpdateCreatureDto {
  @IsNotEmpty()
  name: string;
}
