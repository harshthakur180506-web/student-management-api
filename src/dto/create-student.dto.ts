import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsOptional
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  cgpa: number;

  @IsNotEmpty()
  @IsNumber()
  branchId: number;

@IsOptional()
@IsString()
role?: string;
}