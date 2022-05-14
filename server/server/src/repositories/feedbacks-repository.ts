// Interface para tratar da comunicação da aplicação com o banco de dados.
// Principio SOLID ( Depedenência inversion).
export interface FeedbackCreate {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreate) => Promise<void>;
}