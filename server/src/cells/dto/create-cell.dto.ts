import { IsString, MinLength } from "class-validator";

export class CreateCellDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    @MinLength(10)
    description?: string;
}