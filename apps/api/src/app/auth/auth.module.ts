import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "@api/auth";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("auth.jwt.secret"),
                signOptions: {
                    expiresIn:
                        configService.get<string>("auth.jwt.expiresIn"),
                },
            }),
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
