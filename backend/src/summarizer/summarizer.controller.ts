import { Controller, Post, Body } from '@nestjs/common';
import { SummarizerService } from './summarizer.service';

@Controller('summarizer')
export class SummarizerController {
  constructor(private readonly summarizerService: SummarizerService) {}

  @Post()
  getSummary(@Body('text') text: string) {
    return this.summarizerService.getSummary(text);
  }
}
