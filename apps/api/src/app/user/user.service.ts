import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "@shared/dto";
import * as bcrypt from "bcrypt";
import { User } from "@shared/models";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ) {}

    async findById(userId: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const { email, password } = data;

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            throw new BadRequestException("Email already in use");
        }

        const saltRounds = this.configService.get<string>(
            "auth.password.saltRound"
        );
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
    }
}
