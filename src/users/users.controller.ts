import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserNameDto } from './users.types';
import { Roles } from '../auth';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.find();
  }

  @Get('trainers')
  @Roles('admin')
  findAllTrainers() {
    return this.usersService.find({ roles: 'trainer' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ login: id });
  }

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
    return this.usersService.findOneAndUpdate(
      { login },
      {
        firstName: body.firstName,
        lastName: body.lastName,
      },
    );
  }

  @Get(':login/scores')
  getStudentScore(@Param('login') login: string) {
    return this.usersService.getStudentScores(login);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
