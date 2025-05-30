import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const password = bcrypt.hashSync(createUserDto.password, 10);
    return this.usersRepository.save({ ...createUserDto, password });
  }

  update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.save(updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  findOneBy(params: Partial<User>): Promise<User | null> {
    return this.usersRepository.findOneBy(params);
  }
}
