import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const branch = this.branchRepository.create(createBranchDto);
    return await this.branchRepository.save(branch);
  }

  async findAll() {
    return await this.branchRepository.find();
  }

  async findOne(id: number) {
    const branch = await this.branchRepository.findOne({
      where: { id },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return branch;
  }

  async update(
    id: number,
    updateBranchDto: UpdateBranchDto,
  ) {
    const branch = await this.findOne(id);

    Object.assign(branch, updateBranchDto);

    return await this.branchRepository.save(branch);
  }

  async remove(id: number) {
    const branch = await this.findOne(id);

    await this.branchRepository.delete(id);

    return branch;
  }
}