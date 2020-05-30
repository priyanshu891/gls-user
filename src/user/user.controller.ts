import { Controller, Logger, Post, Request, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '../Model/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @MessagePattern({ role: 'user', cmd: 'get' })
    getUser(data: any): Promise<User> {
        console.log(data);
        return this.userService.findOne({ username: data.username });
    }

    @Post('signup')
    async createUser(@Request() req) {
        return this.userService.createUser(req.body).then().catch(err => {
            console.log(err)
        })
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async greet(): Promise<string> {
        return 'Greetings authenticated user';
    }

    @UseGuards(AuthGuard)
    @Get('user/:username')
    async getUserData(@Request() req): Promise<any> {
        return this.userService.getUserData(req)
    }
}
