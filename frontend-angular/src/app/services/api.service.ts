import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisualizationResult } from '../models/visualization.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '/api/visualize';

  constructor(private http: HttpClient) {}

  generateVisualization(
    code: string,
    language: string
  ): Observable<VisualizationResult> {
    return this.http.post<VisualizationResult>(this.apiUrl, { code, language });
  }
}
