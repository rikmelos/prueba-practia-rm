import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';

export class CreateSocioDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsDate()
  readonly birthDate: Date;
}
