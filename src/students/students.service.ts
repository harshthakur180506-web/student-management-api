import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import csv from 'csv-parser';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './entities/student.entity';
import { Branch } from '../branches/entities/branch.entity';

import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,

    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,
      
  ) {}

  async findAll() {
    return await this.studentRepository.find({
      order: {
        id: 'ASC',
      }
    });
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async create(newStudent: CreateStudentDto) {
  const branch = await this.branchRepository.findOne({
    where: {
      id: newStudent.branchId,
    },
  });

  if (!branch) {
    throw new NotFoundException('Branch not found');
  }

  const hashedPassword = await bcrypt.hash(
    newStudent.password,
    10,
  );

  const student = this.studentRepository.create({
    name: newStudent.name,
    email: newStudent.email,
    password: hashedPassword,
    cgpa: newStudent.cgpa,
    role:newStudent.role,
    branch,
  });

  const savedStudent = await this.studentRepository.save(student);

  this.client.emit('STUDENT_CREATED',{
    id: savedStudent.id,
    name: savedStudent.name,
    email: savedStudent.email
  });
  return savedStudent;
}

  async update(id: string, updatedStudent: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (updatedStudent.branchId) {
      const branch = await this.branchRepository.findOne({
        where: {
          id: updatedStudent.branchId,
        },
      });

      if (!branch) {
        throw new NotFoundException('Branch not found');
      }

      student.branch = branch;
    }

    if (updatedStudent.name) {
      student.name = updatedStudent.name;
    }

    if (updatedStudent.cgpa) {
      student.cgpa = updatedStudent.cgpa;
    }

    return await this.studentRepository.save(student);
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    await this.studentRepository.delete(Number(id));

    return student;
  }
  async paginateStudents(page: number, limit: number) {
  return await this.studentRepository
    .createQueryBuilder('student')
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();
}
  async filterStudents(cgpa:number) {
  return await this.studentRepository
    .createQueryBuilder('student')
    .where('student.cgpa > :cgpa',{
      cgpa:cgpa,
    })
    .getMany();
}

    async searchStudents(name: string) {
  return await this.studentRepository
    .createQueryBuilder('student')
    .where('student.name LIKE :name', {
      name: `%${name}%`,
    })
    .getMany();
}
  async uploadStudents(file: Express.Multer.File) {
  const students: CreateStudentDto[] = [];

  return new Promise((resolve, reject) => {
    console.log('Uploaded File:', file);

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => {
        console.log('CSV Row:', row);

        students.push({
          name: row.name,
          cgpa: Number(row.cgpa),
          branchId: Number(row.branchId),
          email:row.email,
          password:row.password,
        });
      })
      .on('end', async () => {
        console.log('Students Array:', students);

        try {
          for (const student of students) {
            console.log('Saving Student:', student);

            const result = await this.create(student);

            console.log('Saved Successfully:', result);
          }

          resolve({
            message: 'Students imported successfully',
            totalStudents: students.length,
          });
        } catch (error) {
          console.error('ERROR WHILE SAVING:', error);

          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('CSV READ ERROR:', error);

        reject(error);
      });
  });
}
}