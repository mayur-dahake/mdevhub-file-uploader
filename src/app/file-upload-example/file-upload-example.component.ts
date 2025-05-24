import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { MdevhubFileUploadComponent } from '../mdevhub-file-upload/mdevhub-file-upload.component';
import * as XLSX from 'xlsx';

import { MdevhubFileUploaderComponent } from 'mdevhub';
@Component({
  selector: 'app-file-upload-example',
  standalone: false,
  templateUrl: './file-upload-example.component.html',
  styleUrl: './file-upload-example.component.scss',
})
export class FileUploadExampleComponent {
  uploadedFiles: { name: string; type: string; size: number }[] = [];
  currentYear = new Date().getFullYear();
  constructor(public dialog: MatDialog) {}

  public importFile(): void {
    const dialogRef = this.dialog.open(MdevhubFileUploaderComponent, {
      width: '500px',
      data: {
        title: 'Import File',
        allowMultiple: true,
        acceptTypes: ['*/*'],
        maxFileSizeMB: 10,
        enablePreview: true,
        enableUrlUpload: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.files) {
        this.uploadedFiles = result.files.map(
          (f: { name: string; type: string; size: number }) => ({
            name: f.name,
            type: f.type,
            size: f.size,
          })
        );

        // result.files.forEach(
        //   (file: { type: string; name: string; rawFile: File }) => {
        //     if (
        //       file.type === 'text/csv' ||
        //       file.name.endsWith('.csv') ||
        //       file.type ===
        //         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        //       file.type === 'application/vnd.ms-excel' ||
        //       file.name.endsWith('.xlsx') ||
        //       file.name.endsWith('.xls')
        //     ) {
        //       this.readExcelOrCsvFile(file.rawFile);
        //     } else {
        //       // For demo: open other files in a new tab
        //       const url = URL.createObjectURL(file.rawFile);
        //       window.open(url, '_blank');
        //       setTimeout(() => URL.revokeObjectURL(url), 10000);
        //     }
        //   }
        // );       
      }
    });
  }

  readExcelOrCsvFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      console.log('Sheet Data:', jsonData);
      alert(JSON.stringify(jsonData, null, 2)); // Display as alert, or use a dialog/component to show
    };
    reader.readAsArrayBuffer(file);
  }
}
