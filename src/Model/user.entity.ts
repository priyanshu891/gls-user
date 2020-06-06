import { IsEmail, MinLength, IsNotEmpty, IsDefined } from 'class-validator'
import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, ObjectID, ObjectIdColumn } from 'typeorm'
import { UserInterface } from '../Interface/user.interface';
import { hash } from 'bcrypt';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @MinLength(1, {
        message: "UserName Cannot be Blank"
    })
    username: string;

    @Column()
    @MinLength(5, {
        message: "Password length should not be less than 5 characters"
    })
    password: string;

    @Column()
    @IsNotEmpty({
        message: "Name Cannot be Blank"
    })
    @IsDefined({
        message: "Cant be null"
    })
    name: string;

    @Column()
    @IsEmail({}, {
        message: "Email is Incorrect"
    })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        console.log("Encryption Completed")
        this.password = await hash(this.password, 10);
    }
}