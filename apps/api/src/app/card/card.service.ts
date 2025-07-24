import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCardDto, UpdateCardDto } from "@shared/types";

@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async getAllCards() {
        return this.prisma.card.findMany();
    }

    async getCardsByDeck(deckId: string) {
        return this.prisma.card.findMany({
            where: { deckId },
        });
    }

    async createCard(data: CreateCardDto) {
        return this.prisma.card.create({ data });
    }

    async updateCard(id: string, data: UpdateCardDto) {
        return this.prisma.card.update({
            where: {
                id,
            },
            data,
        });
    }
}
