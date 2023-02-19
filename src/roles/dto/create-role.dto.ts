import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'laundryResponsible', description: 'Роль пользователя'})
    readonly value: string;
    @ApiProperty({example: 'Ответственный за стиральную комнату', description: 'Описание роли'})
    readonly description: string
}