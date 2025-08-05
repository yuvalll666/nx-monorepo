import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "@shared/graphql";
import { UserService } from "./user.service";
import { CreateUserInput } from "./graphql/create-user.dto";
import { CreateUserDto, createUserSchema } from "@shared/dto";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    async createUser(@Args("data") data: CreateUserInput) {
        const parsed: CreateUserDto = createUserSchema.parse(data);
        return this.userService.createUser(parsed);
    }

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Query(() => User)
    async getUserById(@Args("id") id: string): Promise<User> {
        return this.userService.findById(id);
    }
}
