import { Controller, Post, Get, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnbanUserDto } from './dto/unban-user.dto';

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
    @UseGuards(JwtAuthGuard)
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

    @ApiOperation({summary: 'Удаление пользователя по ID'})
    @ApiResponse({status: 200})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUserById(id)
    }

    @ApiOperation({summary: 'Изменение роли'})
    @ApiResponse({status: 200})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/role')
    changeRole(@Body() dto: AddRoleDto) {
        return this.usersService.changeRole(dto)
    }

    @ApiOperation({summary: 'Бан пользователя'})
    @ApiResponse({status: 200})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }

    @ApiOperation({summary: 'Разбан пользователя'})
    @ApiResponse({status: 200})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/unban')
    unBan(@Body() dto: UnbanUserDto) {
        return this.usersService.unban(dto)
    }

}
