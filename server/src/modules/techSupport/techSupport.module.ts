import { Global, Module } from '@nestjs/common';
import { SendRequestController } from './controllers/sendRequest';
import { ClientsModule } from '../clients/clients.module';
import { TechSupportService } from './services/techSupport.service';

@Global()
@Module({
  imports: [ClientsModule],
  controllers: [SendRequestController],
  providers: [TechSupportService],
  exports: [TechSupportService],
})
export class TechSupportModule {}
