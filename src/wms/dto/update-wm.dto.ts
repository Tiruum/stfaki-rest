import { PartialType } from '@nestjs/swagger';
import { CreateWmDto } from './create-wm.dto';

export class UpdateWmDto extends PartialType(CreateWmDto) {}
