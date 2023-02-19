import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Получение пользователя по ID'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id)
    }

    // @ApiOperation({summary: 'Удаление пользователя по ID'})
    // @ApiResponse({status: 200, type: Number})
    // @Delete(':id')
    // deleteUser(@Param('id') id: string) {
    //     return this.usersService.delete(id)
    // }

}
