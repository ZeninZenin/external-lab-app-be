import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserNameDto, User } from './users.types';
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

  @Put('verify')
  @Roles('admin')
  verify(@Body() body: User) {
    return this.usersService.verifyUser(body);
  }

  @Put(':login/lock')
  @Roles('admin')
  lock(@Param('login') login: string) {
    return this.usersService.lockUser(login);
  }

  @Put(':login/unlock')
  @Roles('admin')
  unlock(@Param('login') login: string) {
    return this.usersService.unlockUser(login);
  }

  @Put(':login/update-name')
  updateName(@Param('login') login: string, @Body() body: UpdateUserNameDto) {
    return this.usersService.updateName(login, body);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
