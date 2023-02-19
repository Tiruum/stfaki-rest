import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {

    @ApiProperty({example: 'laundry', description: 'Кодовое название комнаты для упрощения взаимодействия'})
    readonly value: string

    @ApiProperty({example: 'Стиральная комната', description: 'Название комнаты'})
    readonly title: string;

    @ApiProperty({example: 'Это комната, в которой можно стирать вещи.', description: 'Описание комнаты'})
    readonly description: string;

    @ApiProperty({example: 123, description: 'ID ответственного'})
    readonly responsibleId: number;

}
