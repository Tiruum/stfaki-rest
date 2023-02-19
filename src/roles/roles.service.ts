import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getAll(): Promise<Role[]> {
        const roles = await this.roleRepository.findAll()
        return roles;
    }

    async getByValue(value: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {value}})
        return role;
    }

    async updateById(value: string, dto: CreateRoleDto) {
        const role = await this.roleRepository.update({...dto}, {where: {value}, returning: true})
        return role
    }

    async deleteById(id: number): Promise<Number> {
        const role = await this.roleRepository.destroy({where: {id}})
        return role
    }
}
