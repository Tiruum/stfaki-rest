import { PartialType } from '@nestjs/swagger';
import { CreateWmEntryDto } from './create-wm-entry.dto';

export class UpdateWmEntryDto extends PartialType(CreateWmEntryDto) {}
