import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
    CardIdDto,
    CreateCardDto,
    DeckIdDto,
    DeckIdsDto,
    UpdateCardDto,
} from "@shared/dto";
import { Card } from "@shared/graphql";

@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async createCard(data: CreateCardDto): Promise<Card> {
        return this.prisma.card.create({ data });
    }

    async updateCard(data: UpdateCardDto): Promise<Card> {
        const { id, ...updateFields } = data;

        return this.prisma.card.update({
            where: {
                id,
            },
            data: updateFields,
        });
    }

    async getAllCards(): Promise<Card[]> {
        return this.prisma.card.findMany({
            where: {
                isTrashed: false,
            },
        });
    }

    async getCardsByDeckId(data: DeckIdDto): Promise<Card[]> {
        const { deckId } = data;

        return this.prisma.card.findMany({
            where: { deckId },
        });
    }

    async getCardsByDeckIds(data: DeckIdsDto): Promise<Card[]> {
        const { deckIds } = data;

        return this.prisma.card.findMany({
            where: {
                deckId: {
                    in: deckIds,
                },
            },
        });
    }

    async softDeleteCard(data: CardIdDto) {
        const { cardId } = data;

        return this.updateCard({
            id: cardId,
            isTrashed: true,
        });
    }

    async restoreCard(data: CardIdDto) {
        const { cardId } = data;

        return this.updateCard({
            id: cardId,
            isTrashed: false,
        });
    }
}
