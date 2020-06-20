import { Injectable, Logger, NotAcceptableException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Model/user.schema';
import { Model } from 'mongoose';
import { UserDto } from 'src/Model/user.dto';
import { Response } from 'express'
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';


type Checker = {
    validation?: boolean,
    error?: any[],
    data?: User
}

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        @Inject('AUTH_CLIENT') private readonly client: ClientProxy
    ) { }

    // Create User Method

    async createUser(newUser: UserDto): Promise<User | any> {
        const createdUser = await new this.userModel(newUser).save().then(user => {
            user.password = undefined
            user.__v = undefined
            return user
        }).catch((err) => {
            if (err instanceof Error) {
                console.log(err.message);
                const error = {
                    status: 400,
                    message: err.message
                }
                throw new NotAcceptableException(error)
            }
        });
        return createdUser
    }

    async findOne(payload): Promise<User> {
        console.log(payload);
        try {
            return this.userModel.findOne(payload)
        } catch (error) {
            Logger.log(error)
        }
    }

    async checker() {
        const res = this.client.send({ role: 'auth', cmd: 'sign' }, { data: "Sending Data" }).pipe(timeout(5000)).toPromise();
        return res;
    }
}
