
import { ManyToOne } from 'typeorm';
import { Branch } from '../../branches/entities/branch.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  cgpa: number;

  @Column({ unique: true })
email: string;

@Column()
password: string;

@Column({
  default: 'student',
})
role: string;

  @ManyToOne(() => Branch, (branch) => branch.students, {
  eager: true,
})
branch: Branch;
}