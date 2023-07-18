import { IsNotEmpty } from 'class-validator';

export class UpdateItemDto {
  @IsNotEmpty()
  name: string;
}
