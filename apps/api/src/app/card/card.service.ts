import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCardDto, UpdateCardDto } from "@shared/dto";
import { Card } from "@shared/models";

@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async getAllCards(): Promise<Card[]> {
        return this.prisma.card.findMany();
    }

    async getCardsByDeckId(deckId: string): Promise<Card[]> {
        return this.prisma.card.findMany({
            where: { deckId },
        });
    }

    async getCardsByDeckIds(deckIds: string[]): Promise<Card[]> {
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

    async updateCard(id: string, data: UpdateCardDto): Promise<Card> {
        return this.prisma.card.update({
            where: {
                id,
            },
            data,
        });
    }
}
