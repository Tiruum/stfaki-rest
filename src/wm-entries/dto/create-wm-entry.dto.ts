import { ApiProperty } from "@nestjs/swagger";

export class CreateWmEntryDto {

    @ApiProperty({example: 'booked', description: 'Статус записи'})
    readonly status: "closed" | "passed" | "booked" | "empty";

    @ApiProperty({example: '123', description: 'ID пользователя, который записывается в ячейку'})
    readonly userId: number | null;

    @ApiProperty({example: '3', description: 'Номер стиральной машины'})
    readonly wmValue: number | null;

    @ApiProperty({example: '00:00-02:00', description: 'Промежуток времени, на который записываются'})
    readonly time: string;

    @ApiProperty({example: '20.02.2023', description: 'День, на который записываются'})
    readonly date: string;
    
}
