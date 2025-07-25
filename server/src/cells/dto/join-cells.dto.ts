import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class JoinCellsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  cellIds: string[];
}
