import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { dbConfig } from './config/dbConfig';

@Module({
    imports: [UserModule, TypeOrmModule.forRoot(dbConfig)],
    controllers: [],
    providers: [],
})
export class AppModule { }
