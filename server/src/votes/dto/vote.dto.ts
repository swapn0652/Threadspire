import { IsIn, IsInt } from 'class-validator';

export class VoteDto {
  @IsInt()
  @IsIn([1, -1])
  value: number;
}
