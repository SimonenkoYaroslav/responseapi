import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/modules/clients/openAi/open-ai.service';

@Injectable()
export class ChatBotService {
  constructor(private readonly openAiService: OpenAiService) {}

  async askQuestion(input: string) {
    return this.openAiService.makeRequest({ input });
  }
}
