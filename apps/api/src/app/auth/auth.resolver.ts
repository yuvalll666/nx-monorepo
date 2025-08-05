import { Resolver, Query, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse, LoginInput } from "./dto";
import { LoginDto, loginSchema } from "@shared/dto";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Query(() => AuthResponse)
    async login(@Args("data") loginData: LoginInput): Promise<AuthResponse> {
        const parsed: LoginDto = loginSchema.parse(loginData);
        const user = await this.authService.validateUser(parsed);
        return this.authService.login(user);
    }
}
