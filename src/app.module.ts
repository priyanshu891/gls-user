import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './Model/user.entity';
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'pass',
        database: 'user-microservice',
        synchronize: true,
        entities: [User]
    })],
    controllers: [],
    providers: [],
})
export class AppModule { }
