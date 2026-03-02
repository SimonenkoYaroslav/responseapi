import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

const { supportInstruction, assistantInstruction } = require('./config');

export interface ConversationContext {
  requiresModerateReasoning?: boolean;
  // Add other context properties as needed
}
@Injectable()
export class OpenAiService {
  openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });
  prevResponseId = '';
  constructor() {}
  async makeRequest(params: { input: string }) {
    const preprocessedInput = this.preprocessUserInput(params.input);
    const response = await this.openai.responses.create({
      model: this.selectModel(preprocessedInput, {}),
      reasoning: { effort: 'low' },
      input: [
        {
          role: 'user',
          content: [{ type: 'input_text', text: params.input }],
        },
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: this.getSystemInstruction(params.input),
            },
          ],
        },
      ],
      previous_response_id: this.prevResponseId,
      store: true,
      // top_p: 0.9,
      temperature: 1,
      // tools: [{ type: 'web_search' }],
    });

    console.log(response.output_text, response);
    this.prevResponseId = response.id;

    return response.output_text;
  }

  private selectModel(
    input: string,
    context: ConversationContext,
  ): 'gpt-4o-mini' | 'gpt-4o' | 'o3-mini' {
    if (this.isSimpleQuery(input)) {
      return 'gpt-4o-mini';
    }
    if (context.requiresModerateReasoning) {
      return 'gpt-4o'; // $2.50/1M input tokens, $10.00/1M output tokens
    }

    // Complex multi-step reasoning or specialized tasks
    return 'o3-mini';
  }

  private isSimpleQuery(input: string): boolean {
    // Implement logic to determine if the query is simple or complex
    // For example, you could check for the presence of certain keywords or the length of the input
    const simpleKeywords = ['what', 'who', 'when', 'where', 'why', 'how'];
    return (
      simpleKeywords.some((keyword) => input.toLowerCase().includes(keyword)) &&
      input.length < 50
    );
  }

  private preprocessUserInput(input: string): string {
    // 1. Remove duplicate whitespace
    let processed = input.replace(/\s+/g, ' ').trim();

    // 2. Truncate excessively long inputs
    const MAX_INPUT_LENGTH = 1000;
    if (processed.length > MAX_INPUT_LENGTH) {
      processed = processed.substring(0, MAX_INPUT_LENGTH) + '...';
    }

    // 3. Remove redundant information
    processed = this.removeRepetition(processed);

    // 4. Clean common noise patterns
    processed = processed
      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '[URL]') // Replace URLs
      .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[EMAIL]'); // Replace emails

    return processed;
  }

  private removeRepetition(text: string): string {
    const sentences = text.match(/[^.!?]+[.!?]/g) || [];
    const uniqueSentences = [...new Set(sentences)];
    return uniqueSentences.join(' ');
  }

  getSystemInstruction = (input: string): string => {
    if (input.toLowerCase().includes('support')) {
      return supportInstruction;
    }
    return assistantInstruction;
  };
}
