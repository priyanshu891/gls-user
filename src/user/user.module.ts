import { ClientsModule, Transport } from '@nestjs/microservices';
import { userSchema, User } from 'src/Model/user.schema';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    ConfigModule,
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false
        },
      }
    }])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
