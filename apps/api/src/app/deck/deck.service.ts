import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateDeckDto, DeckIdDto, UpdateDeckDto } from "@shared/dto";
import { Deck } from "@shared/graphql";
import { CardService } from "../card";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class DeckService {
    constructor(
        private prisma: PrismaService,
        private cardService: CardService
    ) {}

    async createDeck(userId: string, data: CreateDeckDto): Promise<Deck> {
        const { title } = data;

        console.log({
            userId,
            title,
        });

        return this.prisma.deck.create({
            data: {
                title,
                userId,
            },
        });
    }

    async updateDeck(
        userId: string,
        data: UpdateDeckDto,
        prismaClient: Prisma.TransactionClient | PrismaClient = this.prisma
    ): Promise<Deck> {
        const { deckId, ...updateFields } = data;

        if (updateFields.isTrashed === true) {
            updateFields.trashedAt = new Date();
        } else if (updateFields.isTrashed === false) {
            updateFields.trashedAt = null;
        }

        return prismaClient.deck.update({
            where: {
                id: deckId,
                userId,
            },
            data: updateFields,
        });
    }

    async getAllDecksByUserId(userId: string): Promise<Deck[]> {
        return this.prisma.deck.findMany({
            where: {
                userId,
            },
        });
    }

    async softDeleteDeck(userId: string, data: DeckIdDto): Promise<Deck> {
        const { deckId } = data;

        const updateFields: UpdateDeckDto = {
            deckId,
            isTrashed: true,
        };

        const updatedDeck = await this.prisma.$transaction(async (tx) => {
            const deck = await this.updateDeck(userId, updateFields, tx);
            await this.cardService.softDeleteCardByDeckId(deckId, tx);
            return deck;
        });

        return updatedDeck;
    }

    async permanentlyDeletDeck() {}

    async restoreDeck() {}
}
