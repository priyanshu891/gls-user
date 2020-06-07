import { Repository, FindConditions, InsertResult, MongoRepository } from 'typeorm';
import { UserInterface } from '../Interface/user.interface';
import { ClassValidation } from 'src/utils/validator';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Model/user.entity';

type Checker = {
    validation?: boolean,
    error?: any[],
    data?: User
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User> | Repository<User>,
    ) { }

    findOne(query: FindConditions<User>): Promise<User> {
        const users = this.userRepository.findOne();
        return users
    }

    async createUser(user: User): Promise<User | InsertResult | Checker> {
        console.log(user);
        const data = await new ClassValidation().validator(user)
        Logger.log("data")
        Logger.log(data)
        try {
            if ((await data).validation) {
                const userEntity = this.userRepository.create(user);
                const res = this.userRepository.save(userEntity)
                Logger.log('createUser - Created user');
                console.log(res);
                return res;
            } else {
                return data
            }
        } catch (e) {
            Logger.log(e);
            throw e;
        }
    }

    getUserData(payload): Promise<User | UserInterface> {
        const query = payload.params
        const user = this.userRepository.findOne(query).then((user: UserInterface) => {
            user.accesstoken = payload.headers['authorization']?.split(' ')[1]
            return user
        });
        return user;
    }
}
