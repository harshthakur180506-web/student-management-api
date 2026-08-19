import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Student } from '../../students/entities/student.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
  default: 'student',
})
role: string;

  @OneToMany(() => Student, (student) => student.branch)
  students: Student[];
}