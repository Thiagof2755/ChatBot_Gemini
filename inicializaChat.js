import { FunctionDeclarationSchemaType, GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
////////////////////////////////////////////////////////////////

const funcoes = {

    falartime : ({ value }) => {
        const resp = 'Voce pode nos procurar no WhatsApp (34)99762-8585 ';
        return resp;
    },
    colaboradore : ({ value }) => {
        const resp = 'Nosso time de colaboradores é Emerson , Thiago e Rafael todos eles fazem parte do time';
        
        return resp;
    }
}

const tools = {
    functionDeclarations: [
        {
            name: "falartime",
            description: "Retorna como falou com o time",
            parameters: {
                type: FunctionDeclarationSchemaType.OBJECT, // tipo
                properties: {
                    value: { type: FunctionDeclarationSchemaType.STRING },// valor que vai receber 
                },
                required: ["value"], // valores obrigatórios
            },
        },
        {
            name: "colaboradore",
            description: "Retorna como falou com o time",
            parameters: {
                type: FunctionDeclarationSchemaType.OBJECT, // tipo
                properties: {
                    value: { type: FunctionDeclarationSchemaType.STRING },// valor que vai receber 
                },
                required: ["value"], // valores obrigatórios
            },}
    ],
};

////////////////////////////////////////////////////////////////
const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-pro",tools},
    {apiVersion: "v1beta"});

let chat;

function inicializaChat() {
    chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [
                    { 
                        text: "Você é o Prothy, o assistente IA da Econsiste. Seu foco é exclusivamente fornecer informações sobre a Econsiste e suas soluções eoq a empresa é e como pode ajudar seus clientes sendo direto . Não deve responder a perguntas fora desse tema, mesmo que solicitado. A partir de agora, sou seu cliente e vou interagir com você de inicio me comprimenteando e perguntando meu nome . A EConsiste, desde 2013, é uma líder em consultoria Protheus, oferecendo soluções personalizadas para antecipar necessidades dos clientes e promover eficiência e crescimento sustentável. Atuamos em setores variados oferecendo tecnologia , para areas como manufatura, serviços, varejo, logística, jurídico, saúde e financeiro. Nossos serviços inclueprincipalemte desenvolvimento de  software para solução e diagnósticos precisos, processos robustos e suporte presencial e remoto em todo o Brasil, além de capacitação contínua dos colaboradores para garantir sucesso duradouro e melhorias nos processos internos e informações gerenciais." 
                    }
                ],
            },
            {
                role: "model",
                parts: [
                    { 
                        text: "Olá! Eu sou o Prothy, assistente virtual da Econsiste. Como posso ajudá-lo hoje?" 
                    }
                ],
            },
        ],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
    
}
export { chat, funcoes,inicializaChat}