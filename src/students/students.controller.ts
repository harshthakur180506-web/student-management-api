import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('pagination')
  paginateStudents(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.studentsService.paginateStudents(
      Number(page),
      Number(limit),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('filter')
  filterStudents(
    @Query('cgpa') cgpa: string,
  ) {
    return this.studentsService.filterStudents(
      Number(cgpa),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('search')
  searchStudents(
    @Query('name') name: string,
  ) {
    return this.studentsService.searchStudents(name);
  }

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Post('upload')
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueName =
          Date.now() + extname(file.originalname);

        callback(null, uniqueName);
      },
    }),
  }),
)
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return this.studentsService.uploadStudents(file);
}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() newStudent: CreateStudentDto) {
    return this.studentsService.create(newStudent);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatedStudent: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updatedStudent);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard,RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}