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
import { PrismaClient, Prisma } from "@prisma/client";

@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async createCard(data: CreateCardDto): Promise<Card> {
        return this.prisma.card.create({ data });
    }

    async updateCard(
        data: UpdateCardDto,
        prismaClient: Prisma.TransactionClient | PrismaClient = this.prisma
    ): Promise<Card> {
        const { cardId, ...updateFields } = data;

        if (updateFields.isTrashed === true) {
            updateFields.trashedAt = new Date();
        } else if (updateFields.isTrashed === false) {
            updateFields.trashedAt = null;
        }

        return prismaClient.card.update({
            where: {
                id: cardId,
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

    async softDeleteCard(data: CardIdDto): Promise<Card> {
        const { cardId } = data;

        return this.updateCard({
            cardId,
            isTrashed: true,
        });
    }

    async softDeleteCardByDeckId(
        deckId: string,
        tx?: Prisma.TransactionClient
    ): Promise<void> {
        const prismaClient = tx ?? this.prisma;

        await prismaClient.card.updateMany({
            where: {
                deckId,
            },
            data: {
                isTrashed: true,
                trashedAt: new Date(),
            },
        });
    }

    async restoreCard(data: CardIdDto): Promise<Card> {
        const { cardId } = data;

        return this.updateCard({
            cardId,
            isTrashed: false,
        });
    }
}
