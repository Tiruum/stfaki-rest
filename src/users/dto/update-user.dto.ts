import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({example: 'ivanov.ii@phystech.edu', description: 'Почта в домене @phystech.edu'})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Пароль пользователя'})
    readonly password: string

}