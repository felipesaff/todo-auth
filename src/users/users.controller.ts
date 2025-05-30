import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';
import { User } from '../database/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getUser(@Req() req: Request & { user: User }) {
    return req.user;
  }

  //@UseGuards(AuthGuard)
  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
