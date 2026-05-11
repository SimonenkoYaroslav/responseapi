import { VectorStore } from "openai/resources.js";
import { OpenAiService } from "src/modules/clients/openAi/open-ai.service";
import { createReadStream } from 'node:fs';


export class TechSupportService extends OpenAiService {
    vectorStore: VectorStore;
    systemPrompt = `You are a tech support assistant. You will be given a question from a user,
 and you should respond with a thoughtful and helpful answer. 
 Your response should be concise and to the point, while still providing clear instructions and solutions. 
 You should also ask follow-up questions to gather more information about the user's issue and provide more accurate assistance.
 Remember to always be respectful and patient in your responses.`;

    async askQuestion(input: string) {
        const vectorStore = await this.openai.vectorStores.create({
            name: "test"
        });

        await this.openai.vectorStores.fileBatches.uploadAndPoll(
            vectorStore.id,
            {
                files: [createReadStream(`${__dirname}/company.txt`)], 
            }
        );
        return this.makeRequest({
            input,
            systemPrompt: this.systemPrompt,
            tools: [{ type: 'file_search', vector_store_ids: [vectorStore.id] }],
        });
    }

    async initVectoreStore() {
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