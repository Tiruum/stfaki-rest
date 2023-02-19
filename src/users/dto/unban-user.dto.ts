import { ApiProperty } from "@nestjs/swagger";

export class UnbanUserDto {

    @ApiProperty({example: '123', description: 'ID пользователя, которого хотим разбанить'})
    readonly userId: number;

}