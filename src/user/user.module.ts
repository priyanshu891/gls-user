import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Model/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      ClientsModule.register([{
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000
        }
      }])
    ],
    providers: [UserService],
    controllers: [UserController],
  })
  export class UserModule {}
