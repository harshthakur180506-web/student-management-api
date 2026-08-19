import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from '../students/entities/student.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    private readonly jwtService: JwtService,

  ) {}

  async login(loginDto: LoginDto) {
    const student = await this.studentRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!student) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      student.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      id: student.id,
      email: student.email,
      role: student.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}