import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardModule } from "./card/card.module";
import { PrismaModule } from "../prisma/prisma.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        CardModule,
        UserModule,
        PrismaModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            graphiql: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
