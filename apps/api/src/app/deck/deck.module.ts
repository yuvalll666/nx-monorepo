import { Module } from "@nestjs/common";
import { DeckService } from "./deck.service";
import { DeckResolver } from "./deck.resolver";
import { CardModule } from "../card";

@Module({
    imports: [CardModule],
    providers: [DeckResolver, DeckService],
})
export class DeckModule {}
