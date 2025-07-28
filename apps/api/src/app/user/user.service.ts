import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "@shared/types";
import * as bcrypt from "bcrypt";
import { User } from "./models";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findById(userId: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async createUser(createUserData: CreateUserDto): Promise<User> {
        const { email, password } = createUserData;

        const existingUser = this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            throw new BadRequestException("Email already in use");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
    }
}
