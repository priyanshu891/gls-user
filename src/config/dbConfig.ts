import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User } from "src/Model/user.entity"
import { MongooseModuleOptions } from "@nestjs/mongoose";

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

export const mongoURI: string = 'mongodb://localhost/nest';
export const mongoConfig: MongooseModuleOptions = {

}