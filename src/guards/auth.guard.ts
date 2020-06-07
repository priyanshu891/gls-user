import { CanActivate, Inject, ExecutionContext, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { timeout } from 'rxjs/operators'

export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_CLIENT')
        private readonly client: ClientProxy
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const pattern = { role: 'auth', cmd: 'check' };
            const data = { jwt: req.headers['authorization']?.split(' ')[1] }
            const res = await this.client.send(pattern, data).pipe(timeout(5000)).toPromise<boolean>()
            console.log("Hello", res);
            return res;
        } catch (err) {
            return false;
        }
    }
}