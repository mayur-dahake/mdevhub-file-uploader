import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MdevhubFileUploadComponent } from '../mdevhub-file-upload/mdevhub-file-upload.component';
import { CommonDailogComponentComponent } from '../common-dailog-component/common-dailog-component.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload-example',
  standalone: false,
  templateUrl: './file-upload-example.component.html',
  styleUrl: './file-upload-example.component.scss',
})
export class FileUploadExampleComponent {

  constructor(public dialog: MatDialog) {}

  public importFile(): void {
    const dialogRef = this.dialog.open(MdevhubFileUploadComponent, {
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
        result.files.forEach(
          (file: { type: string; name: string; rawFile: File }) => {
            if (
              file.type === 'text/csv' ||
              file.name.endsWith('.csv') ||
              file.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
              file.type === 'application/vnd.ms-excel' ||
              file.name.endsWith('.xlsx') ||
              file.name.endsWith('.xls')
            ) {
              this.readExcelOrCsvFile(file.rawFile);
            } else {
              // For demo: open other files in a new tab
              const url = URL.createObjectURL(file.rawFile);
              window.open(url, '_blank');
              setTimeout(() => URL.revokeObjectURL(url), 10000);
            }
          }
        );
        // You can also use result.formData for direct upload if needed
        // Example: this.uploadFormDataToServer(result.formData);

        this.dialog.open(CommonDailogComponentComponent, {
          data: result,
          width: '400px',
        });
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
