import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { IUser } from "@api/auth";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "@shared/dto";
import { AuthResponse } from "./dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(validUser: IUser): Promise<AuthResponse> {
        const payload = { sub: validUser.id, email: validUser.email };
        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: this.configService.get<string>("auth.jwt.expiresIn"),
                secret: this.configService.get<string>("auth.jwt.secret"),
            }),
        };
    }

    async validateUser(data: LoginDto): Promise<IUser> {
        const { email, password } = data;

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException(
                "User does not exists please register"
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Email or password are incorrect");
        }

        const validUser: IUser = {
            id: user.id,
            email: user.email,
        };

        return validUser;
    }
}
