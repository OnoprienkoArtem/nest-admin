import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post, Put,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from '../auth/auth.guard';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from "./models/user-update.dto";
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.all();
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12);

    return this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password,
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    return this.userService.update(id, body);
  }
}
