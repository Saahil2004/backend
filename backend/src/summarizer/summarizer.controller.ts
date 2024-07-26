import { Controller, Post, Body } from '@nestjs/common';
import { SummarizerService } from './summarizer.service';

@Controller('summarizer')
export class SummarizerController {
  constructor(private readonly summarizerService: SummarizerService) {}

  @Post()
  async getSummary(@Body('text') text: string) {
    const response = await this.summarizerService.getSummary(text).toPromise();
    return response;    
  }
}
// this is a comment
