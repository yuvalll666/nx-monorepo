import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "./models";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.dto";
import { CreateUserDto, createUserSchema } from "@shared/types";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    async createUser(@Args("createUserData") createUserData: CreateUserInput) {
        const parsed: CreateUserDto = createUserSchema.parse(createUserData);
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
