//Classe que lida apenas com envio de um feedback. (Salva no bd e envia o email)
import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

//Interface que contem os dados necessários para enviar um feedback.
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }


    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        //Estabelecendo uma restrição para a imagem ser no formato data:image/png;base64.
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Screenshot must be a base64 encoded string');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        //Parte responsavel por enviar o email.
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : ``,
                `</div>`,
            ].join('')
        })

    }
}