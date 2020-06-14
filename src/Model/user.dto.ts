import { IsEmail, MinLength, IsDefined, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty({
        message: "Name Cannot be Blank"
    })
    @IsDefined({
        message: "Cant be null"
    })
    firstName: string;

    @IsNotEmpty({
        message: "Name Cannot be Blank"
    })
    @IsDefined({
        message: "Cant be null"
    })
    lastName: string;

    @MinLength(5, {
        message: "Password length should not be less than 5 characters"
    })
    password: string;

    @IsEmail({}, {
        message: "Email is Incorrect"
    })
    email: string;
}