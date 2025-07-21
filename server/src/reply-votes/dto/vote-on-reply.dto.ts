import { IsIn, IsInt } from 'class-validator';

export class VoteOnReplyDto {
  @IsInt()
  @IsIn([1, -1])
  value: number;
}
