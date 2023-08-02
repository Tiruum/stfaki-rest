import { ApiProperty } from "@nestjs/swagger";

export class PaymentStatusDto {
    @ApiProperty({example: 'notification'})
    readonly type: string;

    @ApiProperty({example: 'payment.waiting_for_capture'})
    readonly event: string;

    @ApiProperty({example: 123})
    readonly object: {
        id: string,
        status: string
    };
}