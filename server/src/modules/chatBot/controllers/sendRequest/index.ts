import { Controller, Post, Body } from '@nestjs/common';
import { ChatBotService } from '../../services/chat-bot.service';
import { SendRequestDTO } from 'src/modules/common/dto/input/sendRequest';

@Controller()
export class SendRequestController {
  constructor(private readonly chatBotService: ChatBotService) { }

  @Post('send-request')
  async sendRequest(@Body() body: SendRequestDTO) {
    return this.chatBotService.askQuestion(body.input);
  }
}
