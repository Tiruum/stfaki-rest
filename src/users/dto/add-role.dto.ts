import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {

    @ApiProperty({example: 'laundryResponsible', description: 'Название роли, которую хотим выдать'})
    readonly value: string;

    @ApiProperty({example: '123', description: 'ID пользователя, которому хотим выдать роль'})
    readonly userId: number
}