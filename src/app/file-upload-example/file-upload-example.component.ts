import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MdevhubFileUploadComponent } from '../mdevhub-file-upload/mdevhub-file-upload.component';

@Component({
  selector: 'app-file-upload-example',
  standalone: false,
  templateUrl: './file-upload-example.component.html',
  styleUrl: './file-upload-example.component.scss',
})
export class FileUploadExampleComponent {
  /**
   *
   */
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
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
