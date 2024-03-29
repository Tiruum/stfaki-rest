import { ApiProperty } from "@nestjs/swagger";

export class CreateWmEntryDto {

    @ApiProperty({example: 'booked', description: 'Статус записи'})
    readonly status: "closed" | "passed" | "booked" | "empty";

    @ApiProperty({example: '1', description: 'ID пользователя, который записывается в ячейку'})
    readonly userId: number;

    @ApiProperty({example: '4', description: 'Номер стиральной машины'})
    readonly wmValue: number;

    @ApiProperty({example: '4', description: 'Номер стиральной машины'})
    readonly dorm: string;

    @ApiProperty({example: '00:00 - 02:00', description: 'Промежуток времени, на который записываются'})
    readonly time: string;

    @ApiProperty({example: '2023-02-20', description: 'День, на который записываются'})
    readonly date: string;
    
}
