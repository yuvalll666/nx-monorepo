import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
    (_data, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);

        console.log("user in context => ", ctx.getContext().req.user);

        return ctx.getContext().req.user;
    }
);
