import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import {InjectModel} from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnbanUserDto } from './dto/unban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getByValue("user")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async deleteUserById(id: number): Promise<Number> {
        const user = await this.userRepository.destroy({where: {id}})
        return user
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.getUserById(id)
        const room = await this.userRepository.update({...user, ...updateUserDto}, {where: {id}, returning: true})
        return room
    }

    async changeRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id);
            return dto
        }
        throw new HttpException("Пользователь или роль не найдены.", HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = this.userRepository.findByPk(dto.userId);
        if (user && !(await user).banned) {
            (await user).banned = true;
            (await user).banReason = dto.banReason;
            (await user).save();
            return user
        } else {
            throw new HttpException("Пользователь с таким ID не найден или уже забанен.", HttpStatus.NOT_FOUND);
        }
    }

    async unban(dto: UnbanUserDto) {
        const user = this.userRepository.findByPk(dto.userId);
        if (user && (await user).banned) {
            (await user).banned = false;
            (await user).banReason = null;
            (await user).save();
            return user
        } else {
            throw new HttpException("Забаненного пользователя с таким ID не найдено.", HttpStatus.NOT_FOUND);
        }
    }

}