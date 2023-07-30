import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    
    @ApiProperty({example: 'Иван Иванов', description: 'Имя пользователя'})
    readonly username: string;

    @ApiProperty({example: 'ivanov.ii@phystech.edu', description: 'Почта в домене @phystech.edu'})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Пароль пользователя'})
    readonly password: string

    @ApiProperty({example: 'agdsfnsmetbljnkarbUNVRVMlajnmlhNRGkjl', description: 'Refresh токен'})
    readonly refreshToken: string;
    
}