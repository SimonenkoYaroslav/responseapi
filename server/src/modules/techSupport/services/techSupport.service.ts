import { VectorStore } from "openai/resources.js";
import { OpenAiService } from "src/modules/clients/openAi/open-ai.service";
import { createReadStream } from 'node:fs';


export class TechSupportService extends OpenAiService {
    vectorStore: VectorStore;
    systemPrompt = `You are a tech support assistant. You will be given a question from a user,
 and you should respond with a thoughtful and helpful answer. 
 Your response should be concise and to the point, while still providing clear instructions and solutions. 
 You should also ask follow-up questions to gather more information about the user's issue and provide more accurate assistance.
 Remember to always be respectful and patient in your responses.Always point out store you've used to get the answer from. in the end of your answer`;


    async askQuestion(input: string) {
        try {
            const vectorStore = await this.openai.vectorStores.create({
                name: "test"
            });

            await this.openai.vectorStores.fileBatches.uploadAndPoll(
                vectorStore.id,
                {
                    files: [createReadStream(`/Users/aroslavsimonenko/Documents/pdpresponseapi/responseapi/server/src/modules/techSupport/services/company.txt`)],
                }
            );

            const outputText = await this.makeRequest({
                top_p: 0.5,
                input,
                systemPrompt: this.systemPrompt,
                tools: [{ type: 'file_search', vector_store_ids: [vectorStore.id], max_num_results: 2 }],
            });


            return `
        ${this.prevResponseId === '' ? `Thanks for using MobileHub Global Tech Support! ` : ''}\n
        ${outputText}\n
        Best regards,
        MobileHub Global Tech Support Team`;
        } catch (e) {
            console.error(e);

            return `Sorry, something went wrong while processing your request. Please try again later.`;
        }
    }

    async initVectorStore() {
        const vectorStore = await this.openai.vectorStores.create({
            name: "test"
        });

        await this.openai.vectorStores.fileBatches.uploadAndPoll(
            vectorStore.id,
            {
                files: [createReadStream("./company.txt")], // Укажите путь к вашему файлу
            }
        );

        this.vectorStore = vectorStore;
        return;
    }
}