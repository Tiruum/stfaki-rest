import { ApiProperty } from "@nestjs/swagger";

export class CreateEntryDto {

    @ApiProperty({example: '123', description: 'ID пользователя'})
    readonly userId: number;

    @ApiProperty({example: '123', description: 'ID комнаты'})
    readonly commonRoomId: number;

    @ApiProperty({example: 'Просмотр фильма', description: 'Название мероприятия'})
    readonly title: string;

    @ApiProperty({example: 'Фильм Начало', description: 'Описание мероприятия'})
    readonly description: string;

    @ApiProperty({example: '20-02-2023T20:00:00', description: 'Начало мероприятия'})
    readonly from: Date;

    @ApiProperty({example: '20-02-2023T22:00:00', description: 'Конец мероприятия'})
    readonly to: Date;

}
