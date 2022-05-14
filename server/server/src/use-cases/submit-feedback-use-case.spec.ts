import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//Fazendo um espião para o feedback
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

//Setup dos testes.
const submitFeedback = new SubmitFeedbackUseCase(
    //Dependências "falsas" do feedbackrepository e nodemail.
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

//teste da classe submit-feedback-use-case
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo',
            screenshot: 'data:image/png;base64,21315412515',
            //Espero que não haja disparo de exceção..
        })).resolves.not.toThrow();


        //Espero que essas funções tenham sido chamadas.
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })


    it('should not be able to submit feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemplo',
            screenshot: 'data:image/png;base64,21315412515',
            //Espero que haja disparo de exceção..
        })).resolves.toThrow();
    })


    it('should not be able to submit feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,21315412515',
            //Espero que haja disparo de exceção..
        })).resolves.toThrow();
    })

    it('should be able to submit a feedback with a invalid screenshot type', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo',
            screenshot: 'teste.jpg',
            //Espero que haja disparo de exceção..
        })).resolves.toThrow();
    })
});


