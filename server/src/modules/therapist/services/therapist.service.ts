import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/modules/clients/openAi/open-ai.service';
import fs from 'fs'
import { VectorStore } from 'openai/resources.js';


@Injectable()
export class TherapistService extends OpenAiService {
  systemPrompt = `You are a therapist. You will be given a question from a user,
   and you should respond with a thoughtful and empathetic answer. 
   Your response should be concise and to the point, while still providing helpful advice and support. 
   You should also ask follow-up questions to encourage the user to share more about their situation and feelings.
   Remember to always be respectful and non-judgmental in your responses.`;
  vectorStore: VectorStore;

  async askQuestion(input: string) {
    return this.makeRequest({
      input,
      systemPrompt: this.systemPrompt,
      tools: [{ type: 'file_search', vector_store_ids: [] }],
    });
  }



}
