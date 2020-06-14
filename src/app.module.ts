import { Module } from '@nestjs/common';
import { dbConfig, mongoURI } from './config/dbConfig';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [UserModule, TypeOrmModule.forRoot(dbConfig),
        MongooseModule.forRoot(mongoURI)
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
