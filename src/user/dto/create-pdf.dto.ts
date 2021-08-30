import { IsEmail } from 'class-validator';

export class CreatePdfDto {
  @IsEmail()
  email: string;
}
