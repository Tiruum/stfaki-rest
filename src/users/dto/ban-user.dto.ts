import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {

    @ApiProperty({example: '123', description: 'ID пользователя, которого хотим забанить'})
    readonly userId: number;

    @ApiProperty({example: 'Мошенничество', description: 'Причина бана'})
    readonly banReason: string;

}