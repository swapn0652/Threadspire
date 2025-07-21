import { IsString, MinLength } from "class-validator";

export class EditCellDto {
    @IsString()
    title: string;

    @IsString()
    @MinLength(10)
    description: string;
}