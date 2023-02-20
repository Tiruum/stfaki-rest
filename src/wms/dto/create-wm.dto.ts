import { ApiProperty } from "@nestjs/swagger";

export class CreateWmDto {

    @ApiProperty({example: 4, description: 'Номер стиральной машины'})
    readonly value: number;

    @ApiProperty({example: 30, description: 'Стоимость стирки в этой стиральной машине'})
    readonly price: number;

    @ApiProperty({example: false, description: 'Активна ли стиральная машина'})
    readonly isActive: boolean;

}
