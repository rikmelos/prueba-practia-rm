import { IsString, IsNotEmpty, IsDate, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClubDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => Date)
  foundationDate: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  description: string;
}
