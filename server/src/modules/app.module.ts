import { Module } from '@nestjs/common';
import { ChatBotModule } from './chatBot/chat.module';

@Module({
  imports: [ChatBotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
