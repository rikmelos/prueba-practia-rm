import { IsString, IsDate, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateClubDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Date)
  foundationDate?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;
}
