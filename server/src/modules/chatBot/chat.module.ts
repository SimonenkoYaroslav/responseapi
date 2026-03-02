import { Global, Module } from '@nestjs/common';
import { ChatBotService } from './services/chat-bot.service';
import { SendRequestController } from './controllers/sendRequest';
import { ClientsModule } from '../clients/clients.module';

@Global()
@Module({
  imports: [ClientsModule],
  controllers: [SendRequestController],
  providers: [ChatBotService],
  exports: [ChatBotService],
})
export class ChatBotModule {}
