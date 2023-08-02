import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(authDto: AuthUserDto) {
        const user = await this.validateUser(authDto)
        const {accessToken, refreshToken} = await this.generateTokens(user)
        this.userService.update(user.id, {refreshToken})
        return {token: accessToken}
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        const {accessToken, refreshToken} = await this.generateTokens(user)
        this.userService.update(user.id, {refreshToken})
        return {token: accessToken}
    }

    private async generateTokens(user: User) {
        const payload = {email: user.email, id: user.id, username: user.username, balance: user.balance, banned: user.banned, banReason: user.banReason, roles: user.roles}
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken: await this.jwtService.signAsync({id: user.id, email: user.email}),
        }
    }

    private async validateUser(authDto: AuthUserDto) {
        const user = await this.userService.getUserByEmail(authDto.email)
        const passwordEquals = await bcrypt.compare(authDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
        
    }

}
