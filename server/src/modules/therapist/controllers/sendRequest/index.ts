import { Controller, Post, Body } from '@nestjs/common';
import { TherapistService } from '../../services/therapist.service';

@Controller()
export class SendRequestController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post('send-request')
  async sendRequest(@Body() body: { input: string }) {
    return this.therapistService.askQuestion(body.input);
  }
}
