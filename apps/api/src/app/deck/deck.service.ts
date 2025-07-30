import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateDeckDto } from "@shared/dto";
import { Deck } from "@shared/models";

@Injectable()
export class DeckService {
    constructor(private prisma: PrismaService) {}

    // async findById(userId: string): Promise<User> {
    //     return this.prisma.user.findUnique({ where: { id: userId } });
    // }

    // async findAll(): Promise<User[]> {
    //     return this.prisma.user.findMany();
    // }

    async createDeck(userId: string, data: CreateDeckDto): Promise<Deck> {
        const { title } = data;

        return this.prisma.deck.create({
            data: {
                title,
                userId,
            },
        });
    }
}
