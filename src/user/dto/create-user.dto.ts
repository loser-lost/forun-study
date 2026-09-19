import { Length, IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateUserDto {
        @IsEmail()
        @IsNotEmpty()
        email: string;

        @Length(1, 50)
        @IsString()
        @IsNotEmpty()
        name: string;

        @Length(6, 20)
        @IsAlphanumeric()
        @IsNotEmpty()
        password: string;
}
