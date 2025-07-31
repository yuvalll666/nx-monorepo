import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse, LoginInput } from "./dto";
import { LoginDto, loginSchema } from "@shared/dto";
// import { UseGuards } from "@nestjs/common";
// import { CurrentUser, GqlAuthGuard, IUser } from "@api/auth";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => AuthResponse)
    async login(
        @Args("loginData") loginData: LoginInput
    ): Promise<AuthResponse> {
        const parsed: LoginDto = loginSchema.parse(loginData);
        const user = await this.authService.validateUser(parsed);
        return this.authService.login(user);
    }

    // @Query(() => String)
    // @UseGuards(GqlAuthGuard)
    // async test(@CurrentUser() user: IUser) {
    //     console.log("User => ", user);
    //     return "aaaaaaaaaaaa";
    // }
}
