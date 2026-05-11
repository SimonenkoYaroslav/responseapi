import { Controller, Post, Body } from '@nestjs/common';
import { TechSupportService } from '../../services/techSupport.service';

@Controller()
export class SendRequestController {
    constructor(private readonly therapistService: TechSupportService) { }

    @Post('techSupport/send-request')
    async sendRequest(@Body() body: { input: string }) {
        return this.therapistService.askQuestion(body.input);
    }
}
