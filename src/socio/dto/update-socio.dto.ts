import { IsString, IsOptional, IsEmail, IsDate } from 'class-validator';

export class UpdateSocioDto {
  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsDate()
  @IsOptional()
  readonly birthDate?: Date;
}
