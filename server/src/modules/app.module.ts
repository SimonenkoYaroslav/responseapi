import { Module } from '@nestjs/common';
import { TherapistModule } from './therapist/therapist.module';
import { ConfigModule } from '@nestjs/config';
import { TechSupportModule } from './techSupport/techSupport.module';

@Module({
  imports: [TherapistModule, TechSupportModule,ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
