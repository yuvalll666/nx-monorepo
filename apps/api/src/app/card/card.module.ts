import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardResolver } from "./card.resolver";
import { CardLoader } from "./card.loader";

@Module({
    providers: [CardLoader, CardResolver, CardService],
    exports: [CardLoader],
})
export class CardModule {}
