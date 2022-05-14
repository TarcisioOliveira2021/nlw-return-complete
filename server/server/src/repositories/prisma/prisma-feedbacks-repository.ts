import { prisma } from "../../prisma";
import { FeedbackCreate, FeedbacksRepository } from "../feedbacks-repository";

//Responsavél por implementar as funções do banco de dados.
export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot }: FeedbackCreate) {
        await prisma.feedbacks.create({
            data: {
                type,
                comment,
                screenshot,
            }
        })

    }
}