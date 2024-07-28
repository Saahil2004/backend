import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SummarizerService {
  constructor(private readonly httpService: HttpService) {}

  getSummary(text: string): Observable<any> {
    // const url = 'http://localhost:5000/summarize';
    const url = 'http://127.0.0.1:8000/chat';
    return this.httpService.post(url, { url: text }).pipe(
      map(response => response.data)
    );
  }
}
