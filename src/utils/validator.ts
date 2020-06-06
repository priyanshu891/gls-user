import { User } from 'src/Model/user.entity';
import { validate } from 'class-validator';
import { Logger } from '@nestjs/common';
import { UserInterface } from 'src/Interface/user.interface';

type Checker = {
    validation?: boolean;
    error?: any[];
    data?: User;
};

export class ClassValidation {
    validateUser: UserInterface = {};

    async validator(user: User): Promise<Checker> {
        const validateUser = new User();
        validateUser.name = user.name;
        validateUser.email = user.email;
        validateUser.username = user.username;
        validateUser.password = user.password;

        const data = await validate(validateUser).then(errors => {
            const checker: Checker = {
                error: [],
            };
            if (errors.length > 0) {
                errors.forEach(err => {
                    const errorBuilder = {
                        property: err.property,
                        message: err.constraints.minLength || err.constraints.isEmail,
                    };
                    checker.error.push(errorBuilder);
                    Logger.log(errorBuilder);
                    (checker.validation = false), (checker.data = undefined);
                });
            } else {
                (checker.validation = true), (checker.error = undefined);
                checker.data = validateUser;
                console.log('validation succeed');
            }
            return checker;
        });
        return data;
    }
}
