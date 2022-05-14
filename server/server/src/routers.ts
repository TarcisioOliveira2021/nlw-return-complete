import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mailAdapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    //Permite a chamada sem especificar dentro do prisma.feedbacks.create 
    const { type, comment, screenshot } = req.body;

    try {
        const nodemailerMailAdapter = new NodemailerMailAdapter();
        const prismaFeedbackRepository = new PrismaFeedbacksRepository();
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter)


        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
        })

        return res.status(201).send();

    } catch (err) {
        console.log(err)
        return res.status(500).send();
    }
})