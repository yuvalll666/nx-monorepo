import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        console.log("in guard")
        return ctx.getContext().req;
    }
}
