import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Model/user.schema';
import { Model } from 'mongoose';
import { UserDto } from 'src/Model/user.dto';


type Checker = {
    validation?: boolean,
    error?: any[],
    data?: User
}

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>
    ) { }

    async createUser(newUser: UserDto): Promise<User | any> {

        const createdUser = await new this.userModel(newUser).save().then(user => {
            return user
        }).catch((err) => {
            if (err instanceof Error) {
                console.log(err.message);
                return err.message
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
}
