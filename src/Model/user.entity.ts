import { IsEmail, MinLength } from 'class-validator'
import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm'
import { UserInterface } from '../Interface/user.interface';
import { hash } from 'bcrypt';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @MinLength(5, {
        message: "Password length should not be less than 5 characters"
    })
    password: string;

    @Column()
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
        this.password = await hash(this.password, 10);
    }
}