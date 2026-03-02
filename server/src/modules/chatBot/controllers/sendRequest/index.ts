import { Controller, Post, Body } from '@nestjs/common';
import { ChatBotService } from '../../services/chat-bot.service';

@Controller()
export class SendRequestController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Post('send-request')
  async sendRequest(@Body() body: { input: string }) {
    return this.chatBotService.askQuestion(body.input);
  }
}
