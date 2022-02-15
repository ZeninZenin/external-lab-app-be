import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.types';
import { Roles } from '../auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch('verify')
  @Roles('admin')
  verify(@Body() body: User) {
    return this.usersService.verifyUser(body);
  }

  @Patch('lock/:login')
  @Roles('admin')
  lock(@Param('login') login: string) {
    return this.usersService.lockUser(login);
  }

  @Patch('unlock/:login')
  @Roles('admin')
  unlock(@Param('login') login: string) {
    return this.usersService.unlockUser(login);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
