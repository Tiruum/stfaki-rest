import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaymentDto {
    @ApiProperty({example: true})
    readonly isChecked: Boolean;
}