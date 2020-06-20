import { Controller, Logger, Post, Request, UseGuards, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../guards/auth.guard';
import { UserService } from './user.service';
import { User } from 'src/Model/user.schema';
import { get } from 'http';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    //------------- Messages ---------------------

    @MessagePattern({ role: 'user', cmd: 'get' })
    getUser(data: any): Promise<User> {
        return this.userService.findOne({ email: data.email });
    }

    //-------------- End Points ---------------------

    @Post('signup')
    async createUser(@Request() req) {
        return this.userService.createUser(req.body)
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async greet(): Promise<string> {
        return 'Greetings authenticated user';
    }

    @Get('check')
    async checker(@Request() req) {
        return this.userService.checker();
    }
}
