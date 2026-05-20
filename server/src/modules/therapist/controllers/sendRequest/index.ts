import { Controller, Post, Body } from '@nestjs/common';
import { TherapistService } from '../../services/therapist.service';
import { SendRequestDTO } from 'src/modules/common/dto/input/sendRequest';

@Controller()
export class SendRequestController {
  constructor(private readonly therapistService: TherapistService) { }

  @Post('/therapist/send-request')
  async sendRequest(@Body() body: SendRequestDTO) {
    return this.therapistService.askQuestion(body.input);
  }
}
