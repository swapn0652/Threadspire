import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    content: string;

    @IsNotEmpty()
    @IsString()
    cellId: string;
}