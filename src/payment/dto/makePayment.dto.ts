import { ApiProperty } from "@nestjs/swagger";

export class MakePaymentDto {
    @ApiProperty({example: 30})
    readonly amount: number;

    @ApiProperty({example: 30})
    readonly idempotenceKey: number;
}