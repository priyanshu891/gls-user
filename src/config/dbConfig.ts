import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User } from "src/Model/user.entity"

export const dbConfig: TypeOrmModuleOptions = {
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "logging": true,
    "database": "user",
    "entities": [User],
    "synchronize": true,
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}