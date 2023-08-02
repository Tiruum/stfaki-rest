import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
    @ApiProperty({example: '12345'})
    readonly localId: string;

    @ApiProperty({example: 'ghjk-yuio-asdf-qwer'})
    readonly yookassaId: string;

    @ApiProperty({example: 123})
    readonly userId: number;

    @ApiProperty({example: 1000})
    readonly amount: number;

    @ApiProperty({example: true})
    readonly isChecked: Boolean;
}