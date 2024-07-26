import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummarizerService } from './summarizer.service';
import { SummarizerController } from './summarizer.controller';

@Module({
  imports: [HttpModule],
  providers: [SummarizerService],
  controllers: [SummarizerController],
})
export class SummarizerModule {}
