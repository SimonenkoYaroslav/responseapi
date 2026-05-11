import { Global, Module } from '@nestjs/common';
import { SendRequestController } from './controllers/sendRequest';
import { ClientsModule } from '../clients/clients.module';
import { TherapistService } from './services/therapist.service';

@Global()
@Module({
  imports: [ClientsModule],
  controllers: [SendRequestController],
  providers: [TherapistService],
  exports: [TherapistService],
})
export class TherapistModule {}
