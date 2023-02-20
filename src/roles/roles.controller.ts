import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Получение всех ролей'})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAllRoles() {
        return this.roleService.getAll();
    }

    @ApiOperation({summary: 'Получение роли по значению'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getByValue(value);
    }

    @ApiOperation({summary: 'Изменение роли по ID'})
    @ApiResponse({status: 200, type: Number})
    @Put('/:value')
    putById(@Body() dto: CreateRoleDto, @Param('value') value: string) {
        return this.roleService.updateById(value, dto);
    }

    @ApiOperation({summary: 'Удаление роли по ID'})
    @ApiResponse({status: 200, type: Number})
    @Delete('/:id')
    deleteById(@Param('id') id: number) {
        return this.roleService.deleteById(id);
    }

}
