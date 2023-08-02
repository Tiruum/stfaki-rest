import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {

    @ApiProperty({example: 'ivanov.ii@phystech.edu', description: 'Почта'})
    readonly email: string;

    @ApiProperty({example: 'FJbrgjk@Hij$$&tjfk', description: 'Пароль'})
    readonly password: string
    
}