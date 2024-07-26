import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SummarizerService {
  constructor(private readonly httpService: HttpService) {}

  getSummary(text: string): Observable<any> {
    // const url = 'http://localhost:5000/summarize'; // URL of your Python summarizer service
    // return this.httpService.post(url, { text }).pipe(map(response => response.data));
    console.log('Sending text to summarizer service:', text);

    // Mock response
    const mockResponse = {
      summary: `Mock summary of: ${text}`,
      
    };

    // Instead of making an actual HTTP request, return an observable with the mock response
    return of(mockResponse);
  }
}
