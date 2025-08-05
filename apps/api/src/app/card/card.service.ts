import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
    CreateCardDto,
    DeckIdDto,
    DeckIdsDto,
    UpdateCardDto,
} from "@shared/dto";
import { Card } from "@shared/graphql";

@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async getAllCards(): Promise<Card[]> {
        return this.prisma.card.findMany();
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

    async softDeleteCard(id: string) {
        return this.prisma.card.update({
            where: {
                id,
            },
            data: {
                isTrashed: true,
            },
        });
    }

    async permanentlyDeletCard() {}

    async restoreCard() {}
}
