import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummarizerModule } from './summarizer/summarizer.module';

@Module({
  imports: [HttpModule, SummarizerModule],

  //changed
})
export class AppModule {}
