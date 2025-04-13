import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { VisualizationResult } from '../../models/visualization.model';

@Component({
  selector: 'app-visualization',
  template: `
    <div class="border rounded-md mt-6">
      <div class="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <h2 class="text-sm font-medium">Visualization Result</h2>
        <app-button (click)="generateVisualization()">
          Generate Visualization
        </app-button>
      </div>
      <div class="p-4 min-h-[300px] flex items-center justify-center">
        <div *ngIf="loading" class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
          ></div>
          <p class="mt-2 text-gray-600">Generating visualization...</p>
        </div>

        <div *ngIf="!loading && result?.error" class="text-red-500 p-4">
          {{ result.error }}
        </div>

        <div *ngIf="!loading && result?.url" class="w-full h-full">
          <img
            [src]="result.url"
            alt="Visualization"
            class="max-w-full max-h-full mx-auto"
          />
        </div>

        <div *ngIf="!loading && !result" class="text-gray-400 text-center">
          Click "Generate Visualization" to render your code
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class VisualizationComponent implements OnChanges {
  @Input() code: string = '';
  @Input() language: string = 'python';

  result: VisualizationResult | null = null;
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnChanges(): void {
    // Reset the result when code or language changes
    this.result = null;
  }

  generateVisualization(): void {
    if (!this.code.trim()) {
      return;
    }

    this.loading = true;
    this.apiService.generateVisualization(this.code, this.language).subscribe({
      next: (result) => {
        this.result = result;
        this.loading = false;
      },
      error: (error) => {
        this.result = {
          error: 'Failed to generate visualization: ' + error.message,
        };
        this.loading = false;
      },
    });
  }
}
