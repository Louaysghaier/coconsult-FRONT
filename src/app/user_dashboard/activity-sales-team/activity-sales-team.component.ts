import { Component } from '@angular/core';
import { PdfService } from 'src/app/_services/pdf-service.service';

@Component({
  selector: 'app-activity-sales-team',
  templateUrl: './activity-sales-team.component.html',
  styleUrls: ['./activity-sales-team.component.css']
})
export class ActivitySalesTeamComponent {

  constructor(private pdfService: PdfService) { }

  generateAndOpenPdf(): void {
    this.pdfService.generatePdf().subscribe(
      (pdfData) => {
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank'); // Open PDF in a new tab
      },
      (error) => {
        console.error('Error generating PDF:', error);
      }
    );
  }
}
