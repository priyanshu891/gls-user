import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Model/user.entity';
import { Repository, FindConditions, InsertResult } from 'typeorm';
import { validate, ValidationError } from 'class-validator'
import { UserInterface } from '../Interface/user.interface';

type Checker = {
    validation?: boolean,
    error?: any[],
    data?: User
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    findOne(query: FindConditions<User>): Promise<User> {
        const users = this.userRepository.findOne(query);
        return users
    }

    async createUser(user: User): Promise<InsertResult | Checker> {
        Logger.log(user)
        const data: Checker = this.validator(user)
        try {
            if (!data.validation) {
                const userEntity = this.userRepository.create(user);
                const res = this.userRepository.insert(userEntity);
                Logger.log('createUser - Created user');
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
        console.log(payload.headers['authorization']?.split(' ')[1]);
        const query = payload.params
        const user = this.userRepository.findOne(query).then((user: UserInterface) => {
            user.accesstoken = payload.headers['authorization']?.split(' ')[1]
            return user
        });

        return user;
    }

    validator(user: User): Checker {
        const checker: Checker = {
            validation: false,
            error: [],
        }
        const validateUser = new User();
        validateUser.name = user.name
        validateUser.email = user.email
        validateUser.username = user.username
        validateUser.password = user.password

        console.log(validateUser);

        validate(validateUser).then(errors => {
            if (errors.length > 0) {
                errors.forEach(err => {
                    const errorBuilder = {
                        property: err.property,
                        message: err.constraints.minLength || err.constraints.isEmail
                    }
                    checker.error.push(errorBuilder)
                    Logger.log(errorBuilder)
                    console.log(errors);

                })
                checker.validation = false,
                    checker.data = undefined
            } else {
                checker.validation = true,
                    checker.error = undefined
                checker.data = validateUser
                console.log("validation succeed");
            }
        })

        return checker
    }

}
