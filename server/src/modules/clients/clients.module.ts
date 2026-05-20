import { Global, Module } from '@nestjs/common';
import { OpenAiService } from './openAi/open-ai.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class ClientsModule {}
